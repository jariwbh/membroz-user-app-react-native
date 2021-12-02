import React, { Component } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './Style';
import * as IMAGE from '../../styles/image'
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import Loader from '../../components/loader/index';
import SelectDropdown from 'react-native-select-dropdown';
import { CalenderService } from '../../services/CalenderService/CalenderService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const dropdowndata = ["All", "Holiday", "Event"];
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.currentMonth = moment().clone().startOf('month').format('M');
        this.state = {
            holidaysList: [],
            renderList: null,
            loader: true,
            currentMonthHolidays: [],
            selectedItem: "all"
        };
        this.onChangeMonth = this.onChangeMonth.bind(this);
    }

    //GET HOLIDAY API
    getHolidayService() {
        try {
            CalenderService().then(response => {
                this.setState({ holidaysList: response.data });
                this.wait(1000).then(() => this.setState({ loader: false }));
                this.renderCalendarHolidays();
            })
        } catch (error) {
            firebase.crashlytics().recordError(error);
            this.setState({ loader: false });
        }
    }

    componentDidMount() {
        this.getHolidayService();
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET CURRENT MONTH AND FETCH TO START AND END DATE 
    async getDateRange(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    //RENDER CALENDAR HOLIDAYS USING CALENDAR
    async renderCalendarHolidays() {
        var dateArray = await this.getDateRange(this.startDate, this.endDate);
        let holidayDate = {};
        this.state.holidaysList.forEach(element => {
            if (element && element.date) {
                var date = moment(element.date).format('YYYY-MM-DD');
                if (!holidayDate[date]) {
                    holidayDate[date] = {};
                }
                if (this.state.selectedItem === element.type) {
                    holidayDate[date] = {
                        customStyles: {
                            container: { backgroundColor: COLOR.YELLOW },
                            text: { color: COLOR.BLACK }
                        }
                    }
                } else if (this.state.selectedItem === element.type) {
                    holidayDate[date] = {
                        customStyles: {
                            container: { backgroundColor: COLOR.WEB_FOREST_GREEN },
                            text: { color: COLOR.BLACK }
                        }
                    }
                } else if (this.state.selectedItem === "all") {
                    holidayDate[date] = {
                        customStyles: {
                            container: { backgroundColor: COLOR.DEFALUTCOLOR },
                            text: { color: COLOR.WHITE }
                        }
                    }
                }
            }
        });
        var holidays = [];
        //console.log(`dateArray`, dateArray);
        this.state.holidaysList.forEach(element => {
            if (dateArray.includes(moment(element.date).format('YYYY-MM-DD')) && element.type === this.state.selectedItem) {
                holidays.push(element);
            } else if (dateArray.includes(moment(element.date).format('YYYY-MM-DD')) && this.state.selectedItem === "all") {
                holidays.push(element);
            }
        });
        //console.log(`holidays`, holidays);
        this.setState({ renderList: holidayDate, currentMonthHolidays: holidays, Loader: false });
    }

    //CHANGE MONTH TO CALL FUNATION
    async onChangeMonth(month) {
        var date = new Date(month.dateString), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        firstDay = moment(firstDay).format('YYYY-MM-DD');
        lastDay = moment(lastDay).format('YYYY-MM-DD');
        this.setState({ Loader: true });
        this.startDate = firstDay;
        this.endDate = lastDay;
        // this.startDate = moment().month(month - 1, 'months').startOf('month').format('YYYY-MM-DD');
        // this.endDate = moment().month(month - 1, 'months').endOf('month').format('YYYY-MM-DD');
        this.renderCalendarHolidays();
    }

    //RENDER HOLIDAYS LIST USING FLATLIST
    renderHolidaysList = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
            <View style={styles.innercardview}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 15 }}>
                    <Text style={{ fontSize: 14, marginLeft: 15, color: COLOR.BLACK, textTransform: KEY.CAPITALIZE }}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: 5, marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, marginLeft: 15, color: COLOR.BLACK }}>{item && item.date && moment(item.date).format('Do MMMM')}</Text>
                    <Text style={{ fontSize: 14, marginRight: 15, color: COLOR.BLACK }}>{item && item.date && moment(item.date).format('dddd')}</Text>
                </View>
            </View>
        </View>
    )

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
                <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
                <View style={{ marginTop: 20 }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {(this.state.holidaysList == null) || (this.state.holidaysList && this.state.holidaysList.length > 0) &&
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <SelectDropdown
                                defaultValue={"All"}
                                data={dropdowndata}
                                onSelect={(selectedItem, index) => {
                                    this.setState({ selectedItem: selectedItem.toLowerCase() });
                                    this.renderCalendarHolidays()
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                                buttonStyle={{ width: '80%', backgroundColor: COLOR.BACKGROUNDCOLOR, borderWidth: 0.5, borderRadius: 10 }}
                                renderDropdownIcon={() => <Ionicons name="chevron-down" size={25} color={COLOR.BLACK} />}
                                dropdownIconPosition={"right"}
                            />
                        </View>
                    }
                    <View style={{ marginTop: 20 }} />
                    <Calendar
                        enableSwipeMonths={true}
                        theme={{
                            textSectionTitleColor: COLOR.BLACK,
                            backgroundColor: COLOR.BACKGROUNDCOLOR,
                            calendarBackground: COLOR.BACKGROUNDCOLOR,
                            arrowColor: COLOR.BLACK,
                            monthTextColor: COLOR.BLACK,
                            indicatorColor: COLOR.BLACK,
                            dayTextColor: COLOR.BLACK,
                            todayTextColor: COLOR.DEFALUTCOLOR,
                        }}
                        style={{ backgroundColor: COLOR.BACKGROUNDCOLOR }}
                        markedDates={this.state.renderList}
                        onMonthChange={(month) => this.onChangeMonth(month)}
                        markingType={'custom'}
                        hideExtraDays={true}
                    />

                    {(this.state.holidaysList == null) || (this.state.holidaysList && this.state.holidaysList.length > 0) &&
                        <View>
                            <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.BLACK, marginTop: 15, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>List of {this.state.selectedItem}</Text>
                            <FlatList
                                data={this.state.currentMonthHolidays}
                                renderItem={this.renderHolidaysList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item._id}
                                ListFooterComponent={() => (
                                    this.state.currentMonthHolidays && this.state.currentMonthHolidays.length == 0 &&
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 50 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                    </View>
                                )}
                            />
                        </View>
                    }
                    <View style={{ marginBottom: 20 }}></View>
                </ScrollView>
                {this.state.loader ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}



