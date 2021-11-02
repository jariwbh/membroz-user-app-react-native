import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar
} from 'react-native';
import { AttendenceService } from '../../services/AttendanceService/AttendanceService';
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;

const AttendanceScreen = (props) => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [loading, setloading] = useState(true);

    var startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
    var endDate = moment().clone().endOf('month').format('YYYY-MM-DD');
    var today = moment().format('YYYY-MM-DD');
    endDate = today;
    var currentMonth = moment().clone().startOf('month').format('M');

    useEffect(() => {
        setloading(true);
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, attendanceList, memberID])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        setMemberID(memderInfo._id);
        let data = {
            id: memderInfo._id,
            datRange: { gte: startDate, lte: today }
        }
        await getAttendanceList(data);
    }

    //GET ATTENDANCE FUNCTION FETCH DATA THROUGHT API
    const getAttendanceList = async (data) => {
        try {
            const response = await AttendenceService(data);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setAttendanceList(response.data);
                    setloading(false);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{ marginTop: 25 }} />
            {(attendanceList && attendanceList.length > 0)
                ?
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <Calendar
                        enableSwipeMonths={true}
                        hideExtraDays={true}
                        theme={{
                            textSectionTitleColor: COLOR.WHITE,
                            backgroundColor: COLOR.BACKGROUNDCOLOR,
                            calendarBackground: COLOR.BACKGROUNDCOLOR,
                            arrowColor: COLOR.WHITE,
                            monthTextColor: COLOR.WHITE,
                            indicatorColor: COLOR.WHITE,
                            dayTextColor: COLOR.WHITE,
                            todayTextColor: COLOR.DEFALUTCOLOR,
                        }}
                        style={{ backgroundColor: COLOR.BACKGROUNDCOLOR }}
                    />
                </ScrollView>
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                    </View>
                    : <Loader />
            }
        </SafeAreaView>
    );
}
export default AttendanceScreen;


