import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList, RefreshControl
} from 'react-native';
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
import { AppintmentService } from '../../services/AppointmentService/AppiontmentService';
const WIDTH = Dimensions.get('window').width;

const AppointmentScreen = (props) => {
    const getCurrentDay = moment().format('dddd').toLowerCase();
    const TabList = [
        { 'status': 'monday' },
        { 'status': 'tuesday' },
        { 'status': 'wednesday' },
        { 'status': 'thursday' },
        { 'status': 'friday' },
        { 'status': 'saturday' },
        { 'status': 'sunday' }
    ]
    const [weekdays, setWeekday] = useState(getCurrentDay);
    const [loading, setLoading] = useState(false);
    const [appointmentListDayWise, setAppointmentListDayWise] = useState(null);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    const TabFilter = (dayName, index) => {
        const tab = TabList.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setWeekday(dayName);
        setSelectDaywiseDietlist(dayName);
    }

    useEffect(() => {
        setLoading(true);
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, weekdays, userID, refreshing]);

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getAppointmentService(userInfo._id);
    }

    //GET APPOINTMENT LIST FUNCTION 
    const getAppointmentService = async (id) => {
        try {
            const response = await AppintmentService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{ marginTop: 25 }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {(appointmentListDayWise && appointmentListDayWise.length > 0) &&
                    <View>
                        <Text style={{ fontSize: 18, marginLeft: 20, color: COLOR.BLACK, marginTop: 15, marginBottom: 5, textTransform: KEY.CAPITALIZE }}>List of Attendance</Text>
                        <FlatList
                            data={appointmentListDayWise}
                            renderItem={renderAllAppointmentList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item._id}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            ListFooterComponent={() => (
                                myLeaveFilterList && myLeaveFilterList.length > 0 ?
                                    null :
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 150 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                    </View>
                            )}
                        />
                    </View>
                }
            </ScrollView>
            {loading == false ? null : <Loader />}
        </SafeAreaView>
    );
}

export default AppointmentScreen;


