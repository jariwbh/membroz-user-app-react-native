import React, { Component, useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity, TextInput, Keyboard
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';
import moment from 'moment';
import * as SCREEN from '../../context/screen/screenName';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import Toast from 'react-native-simple-toast';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { DEFAULTPROFILE } from '../../context/actions/type';
import { UpdateMemberService } from '../../services/UserService/UserService';
import { patchAppointmentService } from '../../services/AppointmentService/AppiontmentService';
const WIDTH = Dimensions.get('window').width;

const AppointmentDetailScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [memberNote, setMemberNote] = useState(null);
    const [memberNoteError, setMemberNoteError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [userID, setUserID] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [appointmentID, setAppointmentID] = useState(null);

    useEffect(() => {
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, userID, userInfo, memberNote, memberNoteError,
        memberInfo, memberID, appointmentID])

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserInfo(userInfo);
        setUserID(userInfo?._id);
        setAppointmentID(item?._id);
        setMemberID(item?.attendee?._id);
        setMemberInfo(item?.attendee);
        setMemberNote(item?.attendee?.property?.notes ? item.attendee.property.notes : null);
    }

    const item = props.route.params.item;
    const appointmentDate = item.appointmentdate;
    const appointmentTime = item?.timeslot?.starttime + ' - ' + item?.timeslot?.endtime;
    const bookingDate = item.createdAt;
    const memberName = item?.attendee?.fullname;
    const memberAddress = item?.attendee?.property?.address;
    const memberPhoto = item.attendee && item.attendee.profilepic ? item.attendee.profilepic : DEFAULTPROFILE;
    const memberMobile = item.attendee.property.mobile;
    const serviceType = item?.refid?.title;
    const meetingUrl = item && item.property && item.property.onlinemeeturl ? item.property.onlinemeeturl : null;

    //CHECK VALIDATION OF NOTE
    const checkNote = (note) => {
        if (!note || note.length <= 0) {
            setMemberNoteError('Notes Required!');
            setMemberNote(note);
            return;
        }
        setMemberNote(note);
        setMemberNoteError(null);
        return;
    }

    //JOIN NOW BUTTON CLICK TO CALL FUNCTION
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

    //UPDATE MEMBER INFO API CALL
    const UpdateMemberInfoService = async () => {
        let member = memberInfo;
        member.property.notes = memberNote;
        try {
            const response = await UpdateMemberService(memberID, member);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                console.log('Your Profile Updated');
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
            console.log('Your Profile not Updated');
        }
    }

    //UPDATE APPOINTMENT INFO API CALL
    const UpdateAppointmentService = async () => {
        let body = { status: 'confirmed' };
        try {
            const response = await patchAppointmentService(appointmentID, body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                Toast.show('Your appointment confirmed', Toast.LONG);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
            Toast.show('Your appointment not confirmed', Toast.LONG);
        }
    }

    //ONPRESS SUBMITE BUTTON CLICK TO CALL
    const onPressSubmit = async () => {
        if (!memberNote) {
            checkNote(memberNote);
            return;
        }
        setloading(true);
        try {
            Keyboard.dismiss();
            await UpdateMemberInfoService();
            await UpdateAppointmentService();
            props.navigation.goBack(null);
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //SAVE BUTTON CLICK TO CALL FUNCTION
    const onPressToSaveNotes = async () => {
        if (!memberNote) {
            checkNote(memberNote);
            return;
        }
        setloading(true);
        try {
            Keyboard.dismiss();
            await UpdateMemberInfoService();
            props.navigation.goBack(null);
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
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

                    {memberAddress &&
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                            <FontAwesome name='address-card-o' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                            <Text style={styles().rectangleSubText}>{memberAddress}</Text>
                        </View>
                    }

                    {appointmentTime &&
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                            <AntDesign name='clockcircleo' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                            <Text style={styles().rectangleSubText}>{appointmentTime}</Text>
                        </View>
                    }

                    {
                        appointmentDate &&
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                            <AntDesign name='calendar' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                            <Text style={styles().rectangleSubText}>{moment(appointmentDate).format('dddd MMMM D , YYYY')}</Text>
                        </View>
                    }

                    {
                        appointmentDate &&
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 10 }}>
                            <MaterialCommunityIcons name='calendar' size={20} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginTop: 5 }}>
                                {'Booked on ' + moment(bookingDate).format('LL')}
                            </Text>
                        </View>
                    }

                    {meetingUrl &&
                        <TouchableOpacity style={styles().meetingBtn} onPress={() => openWebView(meetingUrl)}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Join Now</Text>
                        </TouchableOpacity>
                    }

                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginTop: 10 }}>Notes : </Text>
                    <View style={{ marginTop: 5, marginLeft: -20, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <TextInput placeholder="Notes"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            style={styles().noteView}
                            style={memberNoteError == null ? styles().noteView : styles().noteViewError}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.DONE}
                            multiline={true}
                            numberOfLines={3}
                            defaultValue={memberNote}
                            onChangeText={(note) => checkNote(note)}
                        />
                    </View>
                    {memberNoteError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{memberNoteError}</Text>}

                    <TouchableOpacity style={styles().doneBtn} onPress={() => onPressToSaveNotes()}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles().doneBtn} onPress={() => onPressSubmit()}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Save & Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {loading == false ? null : <Loader />}
        </SafeAreaView>
    );
}

export default AppointmentDetailScreen;
