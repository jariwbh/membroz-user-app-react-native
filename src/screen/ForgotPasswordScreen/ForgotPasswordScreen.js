import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Image, Keyboard
} from 'react-native';
import { SendEmailService, SendSmsService } from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { CheckUserService } from '../../services/UserService/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { REMOTEDATA } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ForgotPasswordScreen = (props) => {
    const [backgroungImage, setBackgroungImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setloading] = useState(false);
    const [userNameError, setUserNameError] = useState(null);
    const [verifyOtpNumber, setVerifyOtpNumber] = useState(null);
    const [inputOtpNumber, setInputOtpNumber] = useState(null);
    const [inputOtpNumberError, setInputOtpNumberError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [authKey, setAuthKey] = useState(null);
    const [appName, setAppName] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // check AuthController use to Login Or Not Login
        AuthController();
    }, []);

    useEffect(() => {
    }, [backgroungImage, userName, loading, userNameError, verifyOtpNumber,
        inputOtpNumber, userInfo, inputOtpNumberError, authKey, appName])

    // check AuthController use to Login Or Not Login
    async function AuthController() {
        var getUser = await AsyncStorage.getItem(REMOTEDATA);
        var userData = JSON.parse(getUser);
        if (userData) {
            setBackgroungImage(userData.loginimage);
            setAuthKey(userData.authkey);
            setAppName(userData.appname);
        }
    };

    //check email validation
    const checkEmail = (email) => {
        if (!email || email.length <= 0) {
            setUserName(email);
            setUserNameError(languageConfig.usernameerror);
            return;
        }
        setUserName(email);
        setUserNameError(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setUserName(null);
        setUserNameError(null);
        setInputOtpNumber(null);
        setInputOtpNumberError(null);
        setVerifyOtpNumber(null);
        setUserInfo(null);
    }

    // generate OTP function 
    const createOtp = async () => {
        let body;
        if (!userName) {
            checkEmail(userName);
            return;
        }
        try {
            setloading(true);
            if (userName) {
                body = {
                    "username": userName.toUpperCase()
                }
            }

            const CheckUserResponse = await CheckUserService(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != 'undefind' && CheckUserResponse.status == 200) {
                const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                setVerifyOtpNumber(verifyOtpNumber);
                setUserInfo(CheckUserResponse.data);
                onPressSubmit(CheckUserResponse.data.property, verifyOtpNumber);
                Toast.show(languageConfig.optsending, Toast.SHORT);
                setloading(false);
            }
            else {
                Toast.show(languageConfig.usernotexits, Toast.SHORT);
                resetScreen();
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    //OTP verify function
    const otpVerify = async () => {
        if (!inputOtpNumber) {
            setInputOtpNumberError(languageConfig.otprequired);
            return;
        }
        setloading(true);

        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                setloading(false);
                let userValue;
                if (userName) {
                    userValue = userName.toUpperCase()
                }
                resetScreen();
                props.navigation.navigate(SCREEN.NEWPASSWORDSCREEN, { userValue });
            } else {
                setloading(false);
                setInputOtpNumber(null);
                setInputOtpNumberError(languageConfig.otpnotmatch);
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async (user, verifyOtpNumber) => {
        axiosConfig(authKey);
        let mobilebody;
        let emailbody;
        if (user && user.mobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${appName}. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": user.mobile,
                    "subject": "Reset Password OTP"
                }
            }
        }

        if (user && user.primaryemail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${appName}. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": user.primaryemail,
                    "subject": "Reset Password OTP"
                }
            }
        }

        setloading(true);
        try {
            if (user && user.primaryemail) {
                const responseEmail = await SendEmailService(emailbody);
                if (responseEmail.data != 'undefind' && responseEmail.status == 200) {
                    setloading(false);
                }
            }

            if (user && user.mobile) {
                const responseSMS = await SendSmsService(mobilebody);
                if (responseSMS.data != 'undefind' && responseSMS.status == 200) {
                    setloading(false);
                }
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show(languageConfig.usernotexits, Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.containerView}>
                        <Image source={IMAGE.LOCK_ICON} style={{ height: 80, width: 80, marginTop: 80, tintColor: COLOR.DEFALUTCOLOR }} />
                        <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, marginTop: 15, marginLeft: 25, marginRight: 25, textAlign: KEY.CENTER, lineHeight: 25 }}>
                            {languageConfig.loginwithotpheader}
                        </Text>
                        {
                            userInfo ?
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <View>
                                        <TextInput
                                            selectionColor={COLOR.DEFALUTCOLOR}
                                            placeholder={languageConfig.otpplaceholder}
                                            keyboardType={KEY.NUMBER_PAD}
                                            placeholderTextColor={COLOR.WHITE}
                                            selectionColor={COLOR.WHITE}
                                            style={!inputOtpNumberError ? styles.inputTextView : styles.inputTextViewError}
                                            defaultValue={inputOtpNumber}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(number) => setInputOtpNumber(number)}
                                        />
                                        <Text style={{ marginLeft: 35, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -15, marginBottom: 10 }}>{inputOtpNumberError}</Text>
                                    </View>
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.forgotButton}
                                            onPress={() => otpVerify()}>
                                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.verifyotp}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <View style={{ justifyContent: KEY.CENTER }}>
                                        <TextInput
                                            selectionColor={COLOR.DEFALUTCOLOR}
                                            placeholder={languageConfig.usernametext}
                                            placeholderTextColor={COLOR.WHITE}
                                            selectionColor={COLOR.WHITE}
                                            style={!userNameError ? styles.inputTextView : styles.inputTextViewError}
                                            defaultValue={userName}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(email) => checkEmail(email)}
                                        />
                                        <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -15, marginBottom: 10 }}>{userNameError}</Text>
                                    </View>
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.forgotButton} onPress={() => createOtp()}>
                                            <Text style={{
                                                fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE,
                                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE
                                            }}>{languageConfig.next}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading == true ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;

