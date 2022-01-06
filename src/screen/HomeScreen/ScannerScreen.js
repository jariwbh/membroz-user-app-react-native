import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Alert, Button, Platform
} from 'react-native'
import * as SCREEN from '../../context/screen/screenName';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as LocalService from '../../services/LocalService/LocalService';
import * as AttendanceSercice from '../../services/AttendanceService/AttendanceService';
import Toast from 'react-native-simple-toast';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Loader from '../../components/loader/index';
import moment from 'moment';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ScannerScreen = (props) => {
    const todayAttendTime = props.route.params.item;
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [torch, setTorch] = useState(RNCamera.Constants.FlashMode.off);
    const [branchId, setBranchId] = useState(null);

    let currentTime = moment();
    let checkoutTime = moment(todayAttendTime && todayAttendTime.checkout ? todayAttendTime.checkout : currentTime);
    let finalcalbreaktime = moment.duration(currentTime.diff(checkoutTime)).asMinutes();

    useEffect(() => {
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, userID, torch, branchId])

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        setBranchId(userInfo?.branchid?._id);
    }

    //TORCH ON/OFF FUNCTION
    const onTouchFlashMode = () => {
        if (torch == RNCamera.Constants.FlashMode.off) {
            setTorch(RNCamera.Constants.FlashMode.torch);
        } else {
            setTorch(RNCamera.Constants.FlashMode.off);
        }
    }

    // add attendance
    const addAttendence = async () => {
        try {
            let body = {
                checkin: moment().format(),
                checkout: moment().format(),
                membrozid: userID,
                onModel: 'User',
                property: {
                    checkin: moment().format(),
                    checkout: moment().format(),
                    attendancedate: moment().format(),
                    breaktime: finalcalbreaktime,
                    mode: 'checkin',
                }
            }
            const response = await AttendanceSercice.addAttendenceService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                Toast.show('Check in Successfully', Toast.SHORT);
                props.navigation.replace(SCREEN.HOMESCREEN, { item: response.data });
                setTorch(RNCamera.Constants.FlashMode.off);
            } else {
                setTorch(RNCamera.Constants.FlashMode.off);
                Toast.show('OR-CODE Invalid please try again', Toast.SHORT);
            }
        } catch (error) {
            setTorch(RNCamera.Constants.FlashMode.off);
            Toast.show('OR-CODE Invalid please try again', Toast.SHORT);
        }
    }

    // add attendance throught api call
    const addAttendenceUpdate = async () => {
        var id = todayAttendTime._id;
        try {
            let body = {
                checkin: todayAttendTime && todayAttendTime.checkin,
                checkout: moment().format(),
                membrozid: userID,
                onModel: 'User',
                property: {
                    checkin: todayAttendTime && todayAttendTime.checkin,
                    checkout: moment().format(),
                    attendancedate: todayAttendTime?.property?.attendancedate,
                    mode: `${todayAttendTime?.property?.mode == 'checkin' ? 'checkout' : 'checkin'}`,
                    breaktime: todayAttendTime?.property?.mode == 'checkout' ? todayAttendTime?.property?.breaktime + Number(finalcalbreaktime.toFixed()) : todayAttendTime?.property?.breaktime,
                }
            }
            const response = await AttendanceSercice.updateAttendenceService(id, body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                Toast.show(`${todayAttendTime?.property?.mode == 'checkin' ? 'Check out' : 'Check in'} Successfully`, Toast.SHORT);
                setTorch(RNCamera.Constants.FlashMode.off);
                props.navigation.navigate(SCREEN.HOMESCREEN);
            } else {
                setTorch(RNCamera.Constants.FlashMode.off);
                Toast.show('OR-CODE Invalid please try again', Toast.SHORT);
            }
        } catch (error) {
            console.log(`error`, error);
            setTorch(RNCamera.Constants.FlashMode.off);
            setLoading(false);
            Toast.show('OR-CODE Invalid please try again', Toast.SHORT);
        }
    }

    //barcode scan after to return value call function
    const onSucess = (e) => {
        try {
            let barcode = e.data.replace(/\\/g, "");
            let DECODE = JSON.parse(barcode);
            if (branchId == DECODE.branchid) {
                setLoading(true);
                if (todayAttendTime) {
                    addAttendenceUpdate();
                } else {
                    addAttendence();
                }
            } else {
                setLoading(false);
                Toast.show('OR-CODE Invalid please try again', Toast.SHORT);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    };

    return (
        <>
            <View style={{ backgroundColor: COLOR.DEFALUTCOLOR, height: 50, width: WIDTH, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 20 }} >
                <TouchableOpacity style={{ marginLeft: 20, alignItems: KEY.FLEX_START, justifyContent: KEY.FLEX_START }}
                    onPress={() => props.navigation.goBack(null)} >
                    <Ionicons name="arrow-back" size={25} color={COLOR.WHITE} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 5, alignItems: KEY.FLEX_END, flex: 1 }}
                    onPress={() => onTouchFlashMode()}>
                    {torch == RNCamera.Constants.FlashMode.torch ?
                        <MaterialCommunityIcons name='flashlight-off' size={20} color={COLOR.WHITE} style={{ marginRight: 20 }} /> :
                        <MaterialCommunityIcons name='flashlight' size={20} color={COLOR.WHITE} style={{ marginRight: 20 }} />}
                </TouchableOpacity>
            </View>
            <QRCodeScanner
                showMarker={true}
                onRead={(e) => onSucess(e)}
                flashMode={torch}
                checkAndroid6Permissions={true}
                topViewStyle={{ height: 0, flex: 0 }}
                cameraStyle={{ height: HEIGHT }}
                reactivate={true}
                reactivateTimeout={1000}
            />
            {loading ? <Loader /> : null}
        </>
    )
}

export default ScannerScreen;
