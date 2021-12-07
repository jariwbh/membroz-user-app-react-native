import React, { Component, useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { AUTHUSER, DEFAULTPROFILE } from '../../context/actions/type';
import * as SCREEN from '../../context/screen/screenName';
import styles from './Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
const WIDTH = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';

const AppointmentDetailScreen = (props) => {
    const item = props.route.params.item;
    const appointmentDate = item.appointmentdate;
    const appointmentTime = item.timeslot.starttime + ' - ' + item.timeslot.endtime;
    const bookingDate = item.createdAt;
    const memberName = item.attendee.fullname;
    const memberPhoto = item.attendee && item.attendee.profilepic ? item.attendee.profilepic : DEFAULTPROFILE;
    const memberMobile = item.attendee.property.mobile;
    const serviceType = item.refid.title;
    const meetingUrl = item && item.property && item.property.onlinemeeturl ? item.property.onlinemeeturl : null;

    const openWebView = (url) => {
        if (url) {
            return props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { url })
        } else {
            Toast.show('Join meeting problem', Toast.SHORT);
        }
    }

    //IMAGE CLICK TO VIEW IMAGE FUNCTION
    const viewImage = (val) => {
        let viewimage;
        if (val != null) {
            viewimage = val;
            props.navigation.navigate(SCREEN.VIEWIMAGESCREEN, { viewimage });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{ marginTop: 25 }} />
            <View style={{ marginLeft: 20, marginTop: 0, marginBottom: 20 }}>
                <Text style={{
                    fontWeight: FONT.FONT_WEIGHT_BOLD,
                    fontSize: FONT.FONT_SIZE_18,
                    color: COLOR.BLACK,
                    marginTop: 2
                }}>{serviceType}</Text>

                <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles().viewRound} onPress={() => viewImage(memberPhoto)}>
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
                    <TouchableOpacity style={styles().meetingBtn} onPress={() => openWebView(meetingUrl)}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Join Now</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
}

export default AppointmentDetailScreen;
