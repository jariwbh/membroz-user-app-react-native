import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View, TextInput,
    StatusBar, TouchableOpacity, Keyboard
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
const WIDTH = Dimensions.get('window').width;
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import { Picker } from '@react-native-picker/picker';
import { leaveRequestService, leaveTypeService } from '../../services/LeaveService/LeaveService';
import styles from './Style';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default AddLeaveScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [selectLeaveType, setSelectLeaveType] = useState(null);
    const [selectLeaveTypeError, setSelectLeaveTypeError] = useState(null);
    const [userID, setUserID] = useState(null);
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [fromDateError, setFromDateError] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [toDateError, setToDateError] = useState(null);
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLeaveType();
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, leaveTypeList, selectLeaveType, userID, reason, isFromDatePickerVisible,
        reasonError, fromDate, fromDateError, toDate, toDateError, isToDatePickerVisible
    ]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
    }

    //GET LEAVE TYPE FUNATION CALL
    const getLeaveType = async () => {
        try {
            const response = await leaveTypeService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setLeaveTypeList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RESET FIELD FUNCTION
    const resetField = () => {
        setSelectLeaveType(null);
        setSelectLeaveTypeError(null);
        setReason(null);
        setReasonError(null);
        setFromDate(null);
        setFromDateError(null);
        setToDate(null);
        setToDateError(null);
        setFromDatePickerVisibility(false);
        setToDatePickerVisibility(false);
        setLoading(false);
    }

    //ONPRESS TO SUBMIT LEAVE DEATILS
    const onPressToSubmitLeaveRequest = async () => {
        if (!selectLeaveType || !reason || !fromDate || !toDate) {
            checkLeaveType(selectLeaveType);
            checkReason(reason);
            checkFromDate(fromDate);
            checkToDate(toDate);
            return;
        }
        setLoading(true);
        const body = {
            userid: userID,
            leavetype: selectLeaveType,
            property: {
                comment: reason,
                fromdate: fromDate,
                todate: toDate,
                fileupload: [],
                leavetype: selectLeaveType
            },
        }
        try {
            const response = await leaveRequestService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                resetField();
                Toast.show('Your leave request submited');
                props.navigation.navigate(SCREEN.LEAVESCREEN);
            }
        } catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //check validation of Leave Type
    const checkLeaveType = (itemValue) => {
        if (!itemValue || itemValue.length <= 0) {
            setSelectLeaveTypeError('Leave type required!');
            setSelectLeaveType(itemValue);
            return;
        }
        setSelectLeaveType(itemValue);
        setSelectLeaveTypeError(null);
        return;
    }

    //SHOW FROM DATE TO CALL 
    const showDatePickerFromDate = () => {
        setFromDatePickerVisibility(true);
    };

    //SHOW TO DATE TO CALL 
    const showDatePickerToDate = () => {
        setToDatePickerVisibility(true);
    };

    //HIDE FROM DATE TO CALL 
    const hideDatePickerFromDate = () => {
        setFromDatePickerVisibility(false);
    };

    //HIDE TO DATE TO CALL 
    const hideDatePickerToDate = () => {
        setToDatePickerVisibility(false);
    };

    //CONFORM TO DATE TO CALL 
    const toDateHandleConfirm = (date) => {
        let datetime = moment(date).format();
        checkToDate(datetime);
        hideDatePickerToDate();
    };

    //CONFORM FROM DATE TO CALL 
    const fromDateHandleConfirm = (date) => {
        let datetime = moment(date).format();
        checkFromDate(datetime);
        hideDatePickerFromDate();
    };

    //check validation of reason
    const checkReason = (reason) => {
        if (!reason || reason.length <= 0) {
            setReasonError('reason can not be empty');
            setReason(reason);
            return;
        }
        setReason(reason);
        setReasonError(null);
        return;
    }

    //check validation of fromdate
    const checkFromDate = (date) => {
        if (!date || date.length <= 0) {
            setFromDateError('fromdate can not be empty');
            setFromDate(date);
            return;
        }
        setFromDate(date);
        setFromDateError(null);
        return;
    }

    //check validation of todate
    const checkToDate = (date) => {
        if (!date || date.length <= 0) {
            setToDateError('todate can not be empty');
            setToDate(date);
            return;
        }
        setToDate(date);
        setToDateError(null);
        return;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.centerView} />
                <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                    <TextInput
                        style={selectLeaveTypeError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.Done}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                    />
                    <Picker style={{ marginTop: -60, marginRight: 20 }}
                        selectedValue={selectLeaveType}
                        onValueChange={(itemValue, itemIndex) => checkLeaveType(itemValue)}>
                        {
                            leaveTypeList.length > 0 ?
                                leaveTypeList.map((item) => (
                                    <Picker.Item label={item.title} value={item._id} />
                                ))
                                : <Picker.Item label={'No data'} value={'No data'} />
                        }
                    </Picker>
                </View>
                <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                    <TextInput
                        placeholder="Enter reason"
                        selectionColor={COLOR.DEFALUTCOLOR}
                        style={reasonError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.NEXT}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                        defaultValue={reason}
                        onChangeText={(reason) => checkReason(reason)}
                    />
                </View>
                <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                    <TextInput
                        placeholder="From Date"
                        selectionColor={COLOR.DEFALUTCOLOR}
                        style={fromDateError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.NEXT}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                        onFocus={() => showDatePickerFromDate()}
                        onTouchEnd={() => Keyboard.dismiss()}
                        defaultValue={fromDate && moment(fromDate).format('YYYY-MM-DD')}
                    />
                    <DateTimePickerModal
                        isVisible={isFromDatePickerVisible}
                        mode='date'
                        onConfirm={fromDateHandleConfirm}
                        onCancel={hideDatePickerFromDate}
                    />
                </View>
                <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                    <TextInput
                        placeholder="To Date"
                        selectionColor={COLOR.DEFALUTCOLOR}
                        style={toDateError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.NEXT}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                        onFocus={() => showDatePickerToDate()}
                        onTouchEnd={() => Keyboard.dismiss()}
                        defaultValue={toDate && moment(toDate).format('YYYY-MM-DD')}
                    />
                    <DateTimePickerModal
                        isVisible={isToDatePickerVisible}
                        mode='date'
                        onConfirm={toDateHandleConfirm}
                        onCancel={hideDatePickerToDate}
                    />
                </View>
                <TouchableOpacity style={styles.updateBtn} onPress={() => onPressToSubmitLeaveRequest()}>
                    <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


