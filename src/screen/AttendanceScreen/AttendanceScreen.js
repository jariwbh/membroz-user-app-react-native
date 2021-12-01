import React, { Component } from 'react'
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text, FlatList,
    StatusBar
} from 'react-native';
import { AttendenceService } from '../../services/AttendanceService/AttendanceService';
import { HodidayService } from '../../services/CalenderService/CalenderService';
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import * as SCREEN from '../../context/screen/screenName';
import styles from './Style';
const WIDTH = Dimensions.get('window').width;

export default class AttendanceScreen extends Component {
    constructor(props) {
        super(props);
        this.studentDetails = null;
        this.startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.today = moment().format();
        this.endDate = this.today;
        this.currentMonth = moment().clone().startOf('month').format('M');
        this.state = {
            postData: null,
            loading: true,
            attendenceList: [],
            holidaysList: [],
            absentList: [],
            renderList: {}
        };
        this.onChangeMonth = this.onChangeMonth.bind(this);
    }

    //get login user infomation and api
    getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace(SCREEN.LOGINSCREEN);
            }, 3000);
        } else {
            this.studentDetails = JSON.parse(getUser);
            let data = {
                id: this.studentDetails._id,
                datRange: { gte: moment(this.startDate).format(), lte: this.endDate }
            }
            await this.getHolidayService();
            await this.getAttendenceService(data);
            await this.setState({ postData: data });
            await this.renderCalendar(this.startDate, this.endDate)
        }
    }

    // wait function
    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //get holiday list api
    async getHolidayService() {
        try {
            return HodidayService().then(response => {
                this.setState({ holidaysList: response.data });
                return;
            })
        } catch (error) {
            firebase.crashlytics().recordError(error);
            this.setState({ loading: false });
        }
    }

    //get Attendence list api
    async getAttendenceService(data) {
        try {
            return AttendenceService(data).then(response => {
                this.setState({ attendenceList: response.data, loading: false });
            })
        } catch (error) {
            firebase.crashlytics().recordError(error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    //calculate calender date and post data to calender compoment  
    async renderCalendar() {
        var dateArray = await this.getDateRange(this.startDate, this.endDate)
        let combineArray = [];

        await this.state.holidaysList.forEach(element => {
            if (element && element.property && element.property.date) {
                combineArray.push(moment(element.property.date).format('YYYY-MM-DD'))
            }
        });
        await this.state.attendenceList.forEach(element => {
            if (element && element.checkin) combineArray.push(moment(element.checkin).format('YYYY-MM-DD'))
        });

        var checkMonthvalidation = moment(this.startDate).isBefore(this.today);
        if (checkMonthvalidation == true) {
            var absent = dateArray.filter(function (item) {
                return !combineArray.includes(item)
            })
            this.setState({ absentList: absent });
            this.state.renderList = {};
            await absent.forEach(element => {
                if (element) {
                    this.dateConversion(moment(element).format('YYYY-MM-DD'), COLOR.ABSENTCOLOR)
                }
            });
        } else {
            this.setState({ absentList: 0 });
        }

        await this.state.holidaysList.forEach(element => {
            if (element && element.property && element.property.date) {
                this.dateConversion(moment(element.property.date).format('YYYY-MM-DD'), COLOR.YELLOW)
            }
        });

        await this.state.attendenceList.forEach(element => {
            if (element && element.checkin) {
                this.dateConversion(moment(element.checkin).format('YYYY-MM-DD'), COLOR.KELY_GREEN)
            }
        });
        this.setState({ loading: false });
    }

    //date convert to object of list 
    async dateConversion(date, color) {
        if (!this.state.renderList[date]) {
            this.state.renderList[date] = {};
        }
        this.state.renderList[date] = {
            customStyles: {
                container: { backgroundColor: this.getDayColor(date, color) },
                text: { color: COLOR.BLACK }
            }
        };
    }

    //get color with Sunday days Only
    getDayColor(date, color) {
        var dt = moment(date, "YYYY-MM-DD").format('dddd');
        if (dt == "Sunday") return COLOR.DEFAULTLIGHT
        return color;
    }

    //get current month and fetch to start and end date 
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

    //change month to call funation
    async onChangeMonth(val) {
        this.setState({ loading: true });
        this.startDate = moment().year(val.year).month(val.month - 1, 'months').startOf('month').format('YYYY-MM-DD');
        if (this.currentMonth == val.month && moment().format('YYYY') == val.year) {
            this.endDate = this.today;
        } else {
            this.endDate = moment().year(val.year).month(val.month - 1, 'months').endOf('month').format('YYYY-MM-DD');
        }
        let data = {
            id: this.studentDetails._id,
            datRange: { gte: this.startDate, lte: moment(this.endDate, "YYYY-MM-DD").add(1, 'days') }
        }
        await this.getAttendenceService(data);
        await this.getHolidayService();
        await this.renderCalendar();
        this.setState({ loading: false });
    }

    //RENDER ATTANDENCE LIST USING FLATLIST
    renderAllAttendencesList = ({ item }) => (
        <View style={styles.cardView}>
            <View style={styles.filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.checkin).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.checkin).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles.rectangleText}>CheckIn Time : {moment(item.checkin).format('h:mm:ss a')}</Text>
                {item.checkout && <Text style={styles.rectangleText}>CheckOut Time : {moment(item.checkout).format('h:mm:ss a')}</Text>}
                <Text style={styles.rectangleText}>Total Time : {this.getCalculateTime(item)}</Text>
            </View>
        </View>
    )

    //Calculate Total Time
    getCalculateTime(item) {
        let checkinTime = moment(item && item.checkin);
        let checkoutTime = moment(item && item.checkout);
        let duration = moment.duration(checkoutTime.diff(checkinTime));
        let finalcal = moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
        return finalcal;
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
                <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
                <View style={{ marginTop: 25 }} />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
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
                    {(this.state.attendenceList && this.state.attendenceList.length > 0) &&
                        <View>
                            <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.BLACK, marginTop: 15, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>List of Attendance</Text>
                            <FlatList
                                data={this.state.attendenceList}
                                renderItem={this.renderAllAttendencesList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item._id}
                                contentContainerStyle={{ paddingBottom: 20 }}
                            />
                        </View>
                    }
                </ScrollView>
                {this.state.loading == false ? null : <Loader />}
            </SafeAreaView>
        );
    }
}


