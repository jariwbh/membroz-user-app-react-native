import React, { Component, useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity, Modal,
    FlatList, RefreshControl
} from 'react-native';
import Loader from '../../components/loader/index';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER, DEFAULTPROFILE } from '../../context/actions/type';
import * as SCREEN from '../../context/screen/screenName';
import styles from './Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppintmentService } from '../../services/AppointmentService/AppiontmentService';
const WIDTH = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.userDetails = null;
        this.startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
        this.endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.today = moment().clone().endOf('month').format('YYYY-MM-DD');
        this.endDate = this.today;
        this.currentMonth = moment().clone().startOf('month').format('M');
        this.state = {
            postData: null,
            loading: true,
            AppointmentList: [],
            holidaysList: [],
            absentList: [],
            renderList: {},
            showMessageModalVisible: false,
            appointmentDate: null,
            appointmentTime: null,
            bookingDate: null,
            memberName: null,
            memberPhoto: null,
            memberMobile: null,
            serviceType: null,
            meetingUrl: null
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
            this.userDetails = JSON.parse(getUser);
            let data = {
                id: this.userDetails._id,
                datRange: { gte: moment(this.startDate).format(), lte: this.endDate }
            }
            await this.getAppointmentService(data);
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

    //GET APPOINTMENT LIST FUNCTION 
    async getAppointmentService(data) {
        try {
            return AppintmentService(data).then(response => {
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    this.setState({ AppointmentList: response.data, loading: false });
                }
            })
        } catch (error) {
            firebase.crashlytics().recordError(error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    //CALCULATE CALENDER DATE AND POST DATA TO CALENDER COMPOMENT  
    async renderCalendar() {
        var appdate;
        await this.state.AppointmentList.forEach((element) => {
            appdate = moment(element.appointmentdate).format('YYYY-MM-DD')
            if (element && moment(appdate).isBefore(moment().format('YYYY-MM-DD'))) {
                this.dateConversion(appdate, COLOR.RED)
            } else {
                this.dateConversion(appdate, COLOR.DEFALUTCOLOR)
            }
        });
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
        this.setState({ loading: true });
        this.startDate = moment().year(val.year).month(val.month - 1, 'months').startOf('month').format('YYYY-MM-DD');
        if (this.currentMonth == val.month && moment().format('YYYY') == val.year) {
            this.endDate = this.today;
        } else {
            this.endDate = moment().year(val.year).month(val.month - 1, 'months').endOf('month').format('YYYY-MM-DD');
        }
        let data = {
            id: this.userDetails._id,
            datRange: { gte: this.startDate, lte: moment(this.endDate, "YYYY-MM-DD").add(1, 'days') }
        }
        await this.getAppointmentService(data);
        await this.renderCalendar();
        this.setState({ loading: false });
    }

    //EYE BUTTON CLICK TO VIEW MODAL POPUP
    showModelPopup(item) {
        console.log(`item`, item);
        this.setState({
            appointmentDate: item.appointmentdate,
            appointmentTime: item.timeslot.starttime + ' - ' + item.timeslot.endtime,
            bookingDate: item.createdAt,
            memberName: item.attendee.fullname,
            memberPhoto: item.attendee && item.attendee.profilepic ? item.attendee.profilepic : DEFAULTPROFILE,
            memberMobile: item.attendee.property.mobile,
            serviceType: item.refid.title,
            showMessageModalVisible: true,
            meetingUrl: item && item.property && item.property.onlinemeeturl ? item.property.onlinemeeturl : null
        })
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
                <Text style={styles().rectangleText}>{item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{item.timeslot.starttime + ' - ' + item.timeslot.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CONFIRMED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ marginRight: -30 }} onPress={() => this.showModelPopup(item)}>
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
                <Text style={styles().rectangleText}>{item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{item.timeslot.starttime + ' - ' + item.timeslot.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CANCEL_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ marginRight: -30 }} onPress={() => this.showModelPopup(item)}>
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
                <Text style={styles().rectangleText}>{item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{item.timeslot.starttime + ' - ' + item.timeslot.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.NOSHOW_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ marginRight: -30 }} onPress={() => this.showModelPopup(item)}>
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
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{item.timeslot.starttime + ' - ' + item.timeslot.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.REQUESTED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ marginRight: -30 }} onPress={() => this.showModelPopup(item)}>
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
                <Text style={styles().rectangleText}>{item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{item.timeslot.starttime + ' - ' + item.timeslot.endtime}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CHECKOUT_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                    <TouchableOpacity style={{ marginRight: -30 }} onPress={() => this.showModelPopup(item)}>
                        <AntDesign name='eye' size={30} color={COLOR.NOSHOW_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    openWebView = (url) => {
        if (url) {
            this.setState({ showMessageModalVisible: false })
            return this.props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { url })
        } else {
            Toast.show('Join meeting problem', Toast.SHORT);
        }
    }

    //IMAGE CLICK TO VIEW IMAGE FUNCTION
    viewImage = (val) => {
        let viewimage;
        if (val != null) {
            viewimage = val;
            this.setState({ showMessageModalVisible: false })
            this.props.navigation.navigate(SCREEN.VIEWIMAGESCREEN, { viewimage });
        }
    }

    render() {
        const { showMessageModalVisible, appointmentDate, appointmentTime, meetingUrl,
            bookingDate, memberName, memberPhoto, memberMobile, serviceType } = this.state;
        return (
            !showMessageModalVisible ?
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
                        {(this.state.AppointmentList && this.state.AppointmentList.length > 0) &&
                            <View>
                                <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.BLACK, marginTop: 15, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>List of Appintments</Text>
                                <FlatList
                                    data={this.state.AppointmentList}
                                    renderItem={this.renderAllAppointmentList}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => item._id}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            </View>
                        }
                        {/* message model Pop */}
                    </ScrollView>
                    {this.state.loading == false ? null : <Loader />}
                </SafeAreaView>
                :
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                    {/* message model Pop */}
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={showMessageModalVisible}
                        onRequestClose={() => this.setState({ showMessageModalVisible: false })}>
                        <View style={{ flex: 1, alignItems: KEY.CENTER, justifyContent: KEY.CENTER }}>
                            <View style={styles().msgModalView}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showMessageModalVisible: false })}
                                    style={{
                                        marginTop: 10,
                                        marginLeft: (WIDTH + 220) / 2,
                                        borderRadius: 100,
                                        backgroundColor: COLOR.WHITE
                                    }}>
                                    <AntDesign name='closecircleo' size={28} color={COLOR.BLACK} />
                                </TouchableOpacity>

                                <View style={{ marginLeft: 20, marginTop: -20, marginBottom: 20 }}>
                                    <Text style={{
                                        fontWeight: FONT.FONT_WEIGHT_BOLD,
                                        fontSize: FONT.FONT_SIZE_18,
                                        color: COLOR.BLACK,
                                        marginTop: 2,
                                        width: WIDTH / 2
                                    }}>{serviceType}</Text>

                                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles().viewRound} onPress={() => this.viewImage(memberPhoto)}>
                                            <Image source={{ uri: memberPhoto }}
                                                style={!memberPhoto ? { height: 50, width: 50 } : { height: 70, width: 70, borderRadius: 100 }} />
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 10, flex: 1 }}>
                                            <Text style={styles().rectangleText}>{memberName}</Text>
                                            <Text style={styles().rectangleSubText}>{memberMobile}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                                        <AntDesign name='clockcircleo' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                                        <Text style={styles().rectangleSubText}>{appointmentTime}</Text>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                                        <AntDesign name='calendar' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                                        <Text style={styles().rectangleSubText}>{moment(appointmentDate).format('dddd MMMM D , YYYY')}</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: FONT.FONT_SIZE_14,
                                        color: COLOR.BLACK,
                                        marginTop: 5
                                    }}>{'Booked on ' + moment(bookingDate).format('LL')}</Text>

                                    {meetingUrl &&
                                        <TouchableOpacity style={styles().meetingBtn} onPress={() => this.openWebView(meetingUrl)}>
                                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Join Now</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
        );
    }
}

