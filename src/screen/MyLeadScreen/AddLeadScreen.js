import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View,
    StatusBar, TextInput, TouchableOpacity, Keyboard
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import Toast from 'react-native-simple-toast';
import { EnquiyService } from '../../services/EnquiyService/EnquiyService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;
import styles from './Style';

const AddLeadScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userNameError, setUserNameError] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userMoblie, setUserMobile] = useState(null);
    const [userMoblieError, setUserMobileError] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [userPincode, setUserPincode] = useState(null);
    const [userNotes, setUserNotes] = useState(null);
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();
    const fourTextInputRef = React.createRef();
    const fiveTextInputRef = React.createRef();
    const sixTextInputRef = React.createRef();

    useEffect(() => {
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, userID, userInfo, userEmail, userName, userNameError,
        userMoblie, userMoblieError, userAddress, userPincode, userNotes])

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserInfo(userInfo);
        setUserID(userInfo?._id);
    }

    //check validation of fullname
    const checkFullName = (fullname) => {
        if (!fullname || fullname.length <= 0) {
            setUserNameError('Full Name Required');
            setUserName(fullname);
            return;
        }
        setUserName(fullname);
        setUserNameError(null);
        return;
    }

    //check validation of mobile number
    const checkMobile = (mobile) => {
        const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            setUserMobileError('Mobile Number Required');
            return;
        }
        if (!reg.test(mobile)) {
            setUserMobileError('Enter valid Mobile Number');
            return;
        }
        setUserMobile(mobile);
        setUserMobileError(null);
        return;
    }

    //RESET FIELD FUNCTION
    const resetFields = () => {
        setloading(false);
        setUserName(null);
        setUserNameError(null);
        setUserEmail(null);
        setUserMobile(null);
        setUserMobileError(null);
        setUserAddress(null);
        setUserPincode(null);
        setUserNotes(null);
    }

    //ONPRESS ENQUIRE SUBMIT API CALL
    const onPress = async () => {
        if (!userMoblie || !userName) {
            checkFullName(userName);
            checkMobile(userEmail);
            return;
        }

        setloading(true);
        let body = {
            "handlerid": userID,
            "fullname": userName,
            "property": {
                "fullname": userName,
                "mobile": userMoblie,
                "primaryemail": userEmail,
                "address": userAddress,
                "pincode": Number(userPincode),
                "note": userNotes,
                "handlerid": userID
            },
        }
        try {
            const response = await EnquiyService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                resetFields();
                Toast.show('Lead Add Successfully', Toast.LONG);
                props.navigation.navigate(SCREEN.MYLEADSCREEN);
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
            Toast.show('Lead Add Problem', Toast.LONG);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <Image source={IMAGE.CLIPBOARD_TEXT_OUTLINE} style={{ tintColor: COLOR.DEFALUTCOLOR, height: 100, width: 100, marginBottom: 10 }} />
                    <View>
                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder="Full Name"
                            style={userNameError == null ? styles.inputTextView : styles.inputTextViewError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userName}
                            blurOnSubmit={false}
                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                            onChangeText={(fullname) => checkFullName(fullname)}
                        />
                        {userNameError && <Text style={{ marginLeft: 30, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{userNameError}</Text>}
                    </View>
                    <View>
                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder="Mobile Number"
                            keyboardType={KEY.NUMBER_PAD}
                            style={userMoblieError == null ? styles.inputTextView : styles.inputTextViewError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userMoblie}
                            blurOnSubmit={false}
                            ref={secondTextInputRef}
                            onSubmitEditing={() => thirdTextInputRef.current.focus()}
                            onChangeText={(mobile) => checkMobile(mobile)}
                        />
                        {userMoblieError && <Text style={{ marginLeft: 30, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{userMoblieError}</Text>}
                    </View>
                    <View>
                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder="Email"
                            keyboardType={KEY.EMAILADDRESS}
                            style={styles.inputTextView}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userEmail}
                            blurOnSubmit={false}
                            ref={thirdTextInputRef}
                            onSubmitEditing={() => fourTextInputRef.current.focus()}
                            onChangeText={(email) => setUserEmail(email)}
                        />
                    </View>
                    <View>
                        <TextInput placeholder="Address"
                            style={styles.addressView}
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            multiline={true}
                            numberOfLines={3}
                            defaultValue={userAddress}
                            blurOnSubmit={false}
                            ref={fourTextInputRef}
                            onSubmitEditing={() => fiveTextInputRef.current.focus()}
                            onChangeText={(address) => setUserAddress(address)}
                        />
                    </View>
                    <View>
                        <TextInput placeholder="PinCode"
                            keyboardType={KEY.NUMBER_PAD}
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.NEXT}
                            style={styles.inputTextView}
                            defaultValue={userPincode}
                            blurOnSubmit={false}
                            ref={fiveTextInputRef}
                            onSubmitEditing={() => sixTextInputRef.current.focus()}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(pincode) => setUserPincode(pincode)}
                        />
                    </View>
                    <View>
                        <TextInput placeholder="Note"
                            style={styles.addressView}
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.DONE}
                            multiline={true}
                            numberOfLines={3}
                            defaultValue={userNotes}
                            blurOnSubmit={false}
                            ref={sixTextInputRef}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(notes) => setUserNotes(notes)}
                        />
                    </View>
                    <TouchableOpacity style={styles.updateBtn} onPress={() => onPress()}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
export default AddLeadScreen;

