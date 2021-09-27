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
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
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
            calenderList: [],
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
        this.state.holidaysList.forEach(element => {
            if (dateArray.includes(moment(element.date).format('YYYY-MM-DD')) && element.type === this.state.selectedItem) {
                holidays.push(element);
            } else if (dateArray.includes(moment(element.date).format('YYYY-MM-DD')) && this.state.selectedItem === "all") {
                holidays.push(element);
            }
        });
        this.setState({ renderList: holidayDate, currentMonthHolidays: holidays, Loader: false });
    }

    //CHANGE MONTH TO CALL FUNATION
    async onChangeMonth(month) {
        this.setState({ Loader: true });
        this.startDate = moment().month(month - 1, 'months').startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().month(month - 1, 'months').endOf('month').format('YYYY-MM-DD');
        this.renderCalendarHolidays();
    }

    //RENDER HOLIDAYS LIST USING FLATLIST
    renderHolidaysList = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
            <View style={styles.innercardview}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 15 }}>
                    <Text style={{ fontSize: 14, marginLeft: 15, color: COLOR.DAVY_GREY, textTransform: KEY.CAPITALIZE }}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: 5, marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, marginLeft: 15, color: COLOR.DAVY_GREY }}>{item && item.date && moment(item.date).format('Do MMMM')}</Text>
                    <Text style={{ fontSize: 14, marginRight: 15, color: COLOR.DAVY_GREY }}>{item && item.date && moment(item.date).format('dddd')}</Text>
                </View>
            </View>
        </View>
    )

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
                <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />

                {(this.state.holidaysList == null) || (this.state.holidaysList && this.state.holidaysList.length == 0) ?
                    (this.state.loader == false ?
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                        </View>
                        : <Loader />
                    )
                    :
                    <>
                        <View style={{ marginTop: 25 }} />
                        <ScrollView showsVerticalScrollIndicator={false}>
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
                                    buttonStyle={{ width: '80%', backgroundColor: COLOR.WHITE, borderWidth: 0.5, borderRadius: 10 }}
                                    renderDropdownIcon={() => <Ionicons name="chevron-down" size={25} color={COLOR.BLACK} />}
                                    dropdownIconPosition={"right"}
                                />
                            </View>
                            <Calendar
                                markedDates={this.state.renderList}
                                onMonthChange={(month) => this.onChangeMonth(month.month)}
                                markingType={'custom'}
                                hideExtraDays={true}
                            />
                            <View>
                                <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.DAVY_GREY, marginTop: 15, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>List of {this.state.selectedItem}</Text>
                            </View>
                            {(this.state.currentMonthHolidays == null) || (this.state.currentMonthHolidays && this.state.currentMonthHolidays.length == 0) ?
                                <Text style={{ textAlign: KEY.CENTER, fontSize: 14, color: COLOR.BLACK, marginTop: 25, textTransform: KEY.CAPITALIZE }}>No record Available</Text>
                                :
                                <FlatList
                                    data={this.state.currentMonthHolidays}
                                    renderItem={this.renderHolidaysList}
                                    keyExtractor={item => item._id}
                                />
                            }
                            <View style={{ marginBottom: 20 }}></View>
                        </ScrollView></>
                }
            </SafeAreaView>
        );
    }
}



