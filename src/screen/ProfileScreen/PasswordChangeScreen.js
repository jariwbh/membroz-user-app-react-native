import React, { useState, useEffect } from 'react';
import {
    View, SafeAreaView,
    Text, TextInput,
    ScrollView,
    StatusBar,
    Dimensions, Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { ChangePasswordService } from '../../services/PasswordService/PasswordService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ResetPasswordStyle';

const WIDTH = Dimensions.get('window').width;

const PasswordChangeScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [userNumber, setUserNumber] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [RePassword, setRePassword] = useState(null);
    const [currentPasswordError, setCurrentPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [RePasswordError, setRePasswordError] = useState(null);
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();

    useEffect(() => {
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, userNumber, oldPassword, currentPassword, newPassword,
        RePassword, currentPasswordError, newPasswordError, RePasswordError]);

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setloading(false);
        setNewPassword(null);
        setNewPasswordError(null);
        setRePassword(null);
        setRePasswordError(null);
        setCurrentPassword(null);
        setCurrentPasswordError(null);
    }

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        var userLoginInfo = await LocalService.LocalLoginStorageService();
        setOldPassword(userLoginInfo.password);
        setUserNumber(userInfo.username);
    }

    //CHECK CURRENT PASSWORD VALIDATION
    const checkCurrentPassword = (currentpassword) => {
        if (!currentpassword || currentpassword <= 0) {
            return setCurrentPasswordError(languageConfig.passworderrormessage);
        }
        setCurrentPassword(currentpassword);
        setCurrentPasswordError(null);
    }

    //CHECK NEW PASSWORD VALIDATION
    const checkNewPassword = (newpassword) => {
        if (!newpassword || newpassword <= 0) {
            return setNewPasswordError(languageConfig.newpassworderrormessage);
        }
        setNewPassword(newpassword);
        setNewPasswordError(null);
    }

    //CHECK COMFIRM PASSWORD VALIDATION
    const checkRePassword = (repassword) => {
        if (!repassword || repassword <= 0) {
            return setRePasswordError(languageConfig.comfirmpassworderrormessage);
        }
        setRePassword(repassword);
        setRePasswordError(null);
    }

    //add local storage Records
    const setAuthUserInfo = (credentials) => (
        AsyncStorage.setItem(KEY.AUTHUSERINFO, JSON.stringify(credentials))
    )

    //BUTTON CLICK TO CHNAGE PASSWORD FUNCTION 
    const onPressChangePassword = async () => {
        if (!currentPassword || !newPassword || !RePassword) {
            checkCurrentPassword(currentPassword);
            checkNewPassword(newPassword);
            checkRePassword(RePassword);
            return;
        }

        if (oldPassword != currentPassword) {
            setCurrentPasswordError(languageConfig.oldpassworderrormessage);
            return;
        }

        if (newPassword != RePassword) {
            setRePasswordError(languageConfig.repassworderror);
            setNewPasswordError(languageConfig.newpasswordnomatch);
            return;
        }

        const body = {
            username: userNumber,
            currentpassword: currentPassword,
            password: newPassword
        }

        setloading(true);
        try {
            const response = await ChangePasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                Toast.show(languageConfig.passwordchangesuccess, Toast.SHORT);
                resetScreen();
                setAuthUserInfo({ username: userNumber, password: newPassword });
                props.navigation.navigate(SCREEN.PROFILESCREEN);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            Toast.show(languageConfig.passwordnochangeerror, Toast.SHORT);
            resetScreen();
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={styles.viewRound}>
                        <Image source={IMAGE.PADLOCK} style={{ height: 55, width: 55, tintColor: COLOR.DEFALUTCOLOR }} />
                    </View>

                    <View style={{ marginTop: 30, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View>
                            <TextInput
                                selectionColor={COLOR.DEFALUTCOLOR}
                                placeholder={languageConfig.entercurrentpassword}
                                style={currentPasswordError == null ? styles.inputTextView : styles.inputTextViewError}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                defaultValue={currentPassword}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(currentpassword) => checkCurrentPassword(currentpassword)}
                            />
                            {currentPasswordError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -15, marginBottom: 5 }}>{currentPasswordError}</Text>}
                        </View>

                        <View>
                            <TextInput
                                selectionColor={COLOR.DEFALUTCOLOR}
                                placeholder={languageConfig.newpassworderrormessage}
                                style={newPasswordError == null ? styles.inputTextView : styles.inputTextViewError}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                defaultValue={newPassword}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                ref={secondTextInputRef}
                                onSubmitEditing={() => thirdTextInputRef.current.focus()}
                                onChangeText={(newpassword) => checkNewPassword(newpassword)}
                            />
                            {newPasswordError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -15, marginBottom: 5 }}>{newPasswordError}</Text>}
                        </View>

                        <View>
                            <TextInput
                                selectionColor={COLOR.DEFALUTCOLOR}
                                placeholder={languageConfig.confirmpasswordplaceholder}
                                style={RePasswordError == null ? styles.inputTextView : styles.inputTextViewError}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.DONE}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                defaultValue={RePassword}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                ref={thirdTextInputRef}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(repassword) => checkRePassword(repassword)}
                            />
                            {RePasswordError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -15, marginBottom: 5 }}>{RePasswordError}</Text>}
                        </View>

                        <TouchableOpacity style={styles.forgotButton} onPress={() => onPressChangePassword()}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.changepasswordbtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default PasswordChangeScreen;

