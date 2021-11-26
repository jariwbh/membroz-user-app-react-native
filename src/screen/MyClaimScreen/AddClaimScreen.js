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
import styles from './Style';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { advanceClaimRequestService } from '../../services/AdvanceClaimService/AdvanceClaimService';

const claim = [
    { "_id": "Advance", "title": "Advance" },
    { "_id": "Travel Cost", "title": "Travel Cost" },
    { "_id": "Loan", "title": "Loan" },
    { "_id": "Purchase", "title": "Purchase" },
    { "_id": "Other", "title": "Other" }
]

export default AddClaimScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [claimTypeList, setclaimTypeList] = useState(claim);
    const [selectclaimType, setSelectClaimType] = useState(null);
    const [selectClaimTypeError, setSelectClaimTypeError] = useState(null);
    const [userID, setUserID] = useState(null);
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState(null);
    const [amount, setAmount] = useState(null);
    const [amountError, setAmountError] = useState(null);
    const [note, setNote] = useState(null);

    useEffect(() => {
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, userID, reason, selectclaimType, amount, amountError,
        reasonError, claimTypeList, selectClaimTypeError
    ]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
    }

    //RESET FIELD FUNCTION
    const resetField = () => {
        setSelectClaimType(null);
        setSelectClaimTypeError(null);
        setReason(null);
        setReasonError(null);
        setAmount(null);
        setAmountError(null);
        setLoading(false);
    }

    //ONPRESS TO SUBMIT LEAVE DEATILS
    const onPressToSubmitCliamRequest = async () => {
        if (!selectclaimType || !reason || !amount) {
            checkClaimType(selectclaimType);
            checkReason(reason);
            checkAmount(amount);
            return;
        }
        setLoading(true);
        const body = {
            userid: userID,
            title: reason,
            property: {
                claimtype: selectclaimType,
                amount: amount,
                notes: reason,
                title: reason
            }
        }
        try {
            const response = await advanceClaimRequestService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                resetField();
                Toast.show('Your Claim request submited');
                props.navigation.navigate(SCREEN.MYCLAIMSCREEN);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //CHECK VALIDATION OF CLAIM TYPE
    const checkClaimType = (itemValue) => {
        if (!itemValue || itemValue.length <= 0) {
            setSelectClaimTypeError('Leave type required!');
            setSelectClaimType(itemValue);
            return;
        }
        setSelectClaimType(itemValue);
        setSelectClaimTypeError(null);
        return;
    }

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
    const checkAmount = (amount) => {
        if (!amount || amount.length <= 0) {
            setAmountError('Amount can not be empty');
            setAmount(amount);
            return;
        }
        setAmount(amount);
        setAmountError(null);
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
                        style={selectClaimTypeError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.Done}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                    />
                    <Picker style={{ marginTop: -60, marginRight: 20 }}
                        selectedValue={selectclaimType}
                        onValueChange={(itemValue, itemIndex) => checkClaimType(itemValue)}>
                        {
                            claimTypeList.length > 0 ?
                                claimTypeList.map((item) => (
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
                        placeholder="Amount"
                        selectionColor={COLOR.DEFALUTCOLOR}
                        style={amountError == null ? styles.inputTextView : styles.inputTextViewError}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.NEXT}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                        defaultValue={amount}
                        onChangeText={(amount) => checkAmount(amount)}
                    />
                </View>

                <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20 }}>
                    <TextInput
                        placeholder="Notes"
                        selectionColor={COLOR.DEFALUTCOLOR}
                        style={styles.inputTextView}
                        type={KEY.CLEAR}
                        returnKeyType={KEY.NEXT}
                        placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                        defaultValue={note}
                        onChangeText={(note) => setNote(note)}
                    />
                </View>

                <TouchableOpacity style={styles.updateBtn} onPress={() => onPressToSubmitCliamRequest()}>
                    <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


