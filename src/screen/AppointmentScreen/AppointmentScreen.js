import React, { Component, useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { AppintmentService, AppintmentSupportStaffService } from '../../services/AppointmentService/AppiontmentService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { AUTHUSER, DEFAULTPROFILE } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment-timezone';
//import moment from 'moment';
import styles from './Style';


const WIDTH = Dimensions.get('window').width;

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.userDetails = null;
        this.currentDate = null;
        this.startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.today = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.endDate = this.today;
        this.currentMonth = moment().clone().startOf('month').format('M');
        this.timezone = null;
        this.state = {
            postData: null,
            loading: true,
            AppointmentList: [],
            holidaysList: [],
            absentList: [],
            renderList: {},
            appointmentDate: null,
            appointmentTime: null,
            bookingDate: null,
            memberName: null,
            memberPhoto: null,
            memberMobile: null,
            serviceType: null,
            meetingUrl: null,
            selectedDay: null,
            previousDay: null,
            userID: null
        };
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', (e) => {
            this.selectPreviewDay();
        });
    }

    selectPreviewDay = () => {
        this.onPressSelectedDay(this.state.previousDay);
    }

    //get login user infomation and api
    getUserData = async () => {
        try {
            var getUser = await AsyncStorage.getItem(AUTHUSER);
            if (getUser == null) {
                setTimeout(() => {
                    this.props.navigation.replace(SCREEN.LOGINSCREEN);
                }, 3000);
            } else {
                this.currentDate = moment().format('YYYY-MM-DD');
                this.userDetails = JSON.parse(getUser);
                this.timezone = this.userDetails?.branchid?.timezone;
                moment.tz.setDefault(this.userDetails?.branchid?.timezone);
                var today = new Date(this.currentDate);
                today.setHours(0, 0, 0, 0);
                let data = {
                    id: this.userDetails._id,
                    datRange: { gte: today }
                    // datRange: { gte: today, lte: today }
                }
                this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') })
                this.setState({ userID: this.userDetails._id });
                await this.getAppointmentService(data);
                await this.setState({ postData: data });
                await this.renderCalendar(this.startDate, this.endDate)
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    // wait function
    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET APPOINTMENT LIST FUNCTION 
    async getAppointmentService(data) {
        try {
            const response = await AppintmentService(data);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                const appintmentSupportStaffService = await AppintmentSupportStaffService(data);
                if (appintmentSupportStaffService.data != null && appintmentSupportStaffService.data != 'undefind' && response.status == 200) {
                    var appointmentLists = [...response.data, ...appintmentSupportStaffService.data];
                    appointmentLists.map(p => {
                        var starttime = p.timeslot.starttime.split(":");
                        var hours = starttime[0];
                        var minutes = starttime[1];
                        if (hours && hours.length == 1) {
                            hours = "0" + hours;
                        }
                        if (minutes && minutes.length == 1) {
                            minutes = "0" + minutes;
                        }
                        p.starttime = hours + ":" + minutes + ":00";
                    });
                    appointmentLists.sort((a, b) => a.starttime.localeCompare(b.starttime));
                    this.setState({ AppointmentList: appointmentLists, loading: false });
                }
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            this.setState({ loading: false });
        }
    }

    async componentDidMount() {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        this.getUserData();
    }

    componentWillUnmount() {
        // Remove the event listener
        this._unsubscribeSiFocus();
    }

    //ONPRESS TO SELECT DAY
    onPressSelectedDay = async (day) => {
        this.setState({ previousDay: day });
        day = day && day.dateString ? moment(day.dateString).format('YYYY-MM-DD') : { dateString: moment().format('YYYY-MM-DD') };
        let markedDates = {};
        markedDates[day] = { selected: true, marked: false, selectedColor: COLOR.DEFALUTCOLOR }
        this.setState({ selectedDay: markedDates, loading: true })
        this.currentDate = day;
        var today = new Date(this.currentDate);
        today.setHours(0, 0, 0, 0);
        let data = {
            id: this.userDetails._id,
            datRange: { gte: today }
            // datRange: { gte: today, lte: today }
        }
        await this.getAppointmentService(data);
    }

    //CALCULATE CALENDER DATE AND POST DATA TO CALENDER COMPOMENT  
    async renderCalendar() {
        var appdate;
        if (this.state.AppointmentList.length > 0) {
            await this.state.AppointmentList.forEach((element) => {
                appdate = moment(element.appointmentdate).format('YYYY-MM-DD')
                if (element && moment(appdate).isBefore(moment().format('YYYY-MM-DD'))) {
                    this.dateConversion(appdate, COLOR.RED)
                } else {
                    this.dateConversion(appdate, COLOR.DEFALUTCOLOR)
                }
            });
        }
        this.setState({ loading: false });
    }

    //DATE CONVERT TO OBJECT OF LIST 
    async dateConversion(date, color) {
        if (!this.state.renderList[date]) {
            this.state.renderList[date] = {};
        }
        this.state.renderList[date] = {
            customStyles: {
                container: { backgroundColor: color },
                text: { color: COLOR.BLACK }
            }
        };
    }

    //date convert to object of list 
    async dateConversion(date, color) {
        if (!this.state.renderList[date]) {
            this.state.renderList[date] = {};
        }
        this.state.renderList[date] = {
            customStyles: {
                container: { backgroundColor: color },
                //container: { backgroundColor: this.getDayColor(date, color) },
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

    //change month to call funation
    async onChangeMonth(val) {
        let data;
        this.setState({ loading: true });
        this.startDate = moment().year(val.year).month(val.month - 1, 'months').startOf('month').format('YYYY-MM-DD');
        if (this.currentMonth == val.month && moment().format('YYYY') == val.year) {
            this.endDate = this.today;
        } else {
            this.endDate = moment().year(val.year).month(val.month - 1, 'months').endOf('month').format('YYYY-MM-DD');
        }
        if (Number(moment().format('M')) == val.month && Number(moment().format('YYYY')) === val.year) {
            var today = new Date(this.currentDate);
            today.setHours(0, 0, 0, 0);
            data = {
                id: this.userDetails._id,
                datRange: { gte: today }
                // datRange: { gte: moment(this.currentDate).format(), lte: this.currentDate }
            }
            this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') })
        } else {
            var today = new Date(this.currentDate);
            today.setHours(0, 0, 0, 0);
            data = {
                id: this.userDetails._id,
                datRange: { gte: today }
                // datRange: { gte: this.startDate, lte: moment(this.endDate, "YYYY-MM-DD").add(1, 'days') }
            }
        }
        await this.getAppointmentService(data);
        await this.renderCalendar();
        this.setState({ loading: false });
    }

    //EYE BUTTON CLICK TO VIEW MODAL POPUP
    showModelPopup(item) {
        this.props.navigation.navigate(SCREEN.APPOINTMENTDETAILSCREEN, { item })
    }

    //RENDER ATTANDENCE LIST USING FLATLIST
    renderAllAppointmentList = ({ item }) => (
        item.status == 'confirmed' &&
        <View style={styles(COLOR.CONFIRMED_COLOR).cardView}>
            <View style={styles(COLOR.CONFIRMED_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CONFIRMED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -15 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        ||
        item.status == 'cancel' &&
        <View style={styles(COLOR.CANCEL_COLOR).cardView}>
            <View style={styles(COLOR.CANCEL_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CANCEL_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -15 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        ||
        item.status == 'noshow' &&
        <View style={styles(COLOR.NOSHOW_COLOR).cardView}>
            <View style={styles(COLOR.NOSHOW_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.NOSHOW_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -15 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        ||
        item.status == 'requested' &&
        <View style={styles(COLOR.REQUESTED_COLOR).cardView}>
            <View style={styles(COLOR.REQUESTED_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 0 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.REQUESTED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -20 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        ||
        item.status == 'checkout' &&
        <View style={styles(COLOR.CHECKOUT_COLOR).cardView}>
            <View style={styles(COLOR.CHECKOUT_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CHECKOUT_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -15 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        ||
        item.status == 'checkinguest' &&
        <View style={styles(COLOR.CHECKIN_COLOR).cardView}>
            <View style={styles(COLOR.CHECKIN_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item?.attendee?.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item?.refid?.title}</Text>
                <Text style={styles().rectangleSubText}>{item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CHECKIN_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ justifyContent: KEY.FLEX_END, marginRight: -15 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

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
                        markedDates={this.state.selectedDay}
                        onDayPress={(day) => this.onPressSelectedDay(day)}
                        onMonthChange={(month) => this.onChangeMonth(month)}
                        markingType={'custom'}
                        hideExtraDays={true}
                    />
                    {(this.state.AppointmentList && this.state.AppointmentList.length > 0) &&
                        <View>
                            <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.BLACK, marginTop: 10, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>{languageConfig.listofappintments}</Text>
                            <FlatList
                                data={this.state.AppointmentList}
                                renderItem={this.renderAllAppointmentList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item._id}
                                contentContainerStyle={{ paddingBottom: 20 }}
                            />
                        </View>
                    }
                    {/* message model Pop */}
                </ScrollView>
                {this.state.loading == false ? null : <Loader />}
            </SafeAreaView>
        );
    }
}

