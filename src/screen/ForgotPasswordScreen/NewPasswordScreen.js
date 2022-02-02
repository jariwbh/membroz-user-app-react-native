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
    StyleSheet,
    StatusBar, Image, Keyboard
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import AsyncStorage from '@react-native-community/async-storage';
import { REMOTEDATA } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import { ForgetPasswordService } from '../../services/PasswordService/PasswordService';
import Toast from 'react-native-simple-toast';
import axiosConfig from '../../helpers/axiosConfig';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NewPasswordScreen = (props) => {
    const [backgroungImage, setBackgroungImage] = useState(null);
    const userName = props.route.params.userValue;
    const [newPassword, setNewPassword] = useState(null);
    const [newPassworderror, setNewPassworderror] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [rePassworderror, setRePassworderror] = useState(null);
    const [loading, setloading] = useState(false);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
    }, [newPassword, newPassworderror, rePassword, rePassworderror, loading])

    useEffect(() => {
        // check AuthController use to Login Or Not Login
        AuthController();
    }, []);

    async function AuthController() {
        var getUser = await AsyncStorage.getItem(REMOTEDATA);
        var userData = JSON.parse(getUser);
        if (userData) {
            setBackgroungImage(userData.loginimage)
        }
    };

    //check password validation
    const setNewPasswordCheck = (password) => {
        if (!password || password.length <= 0) {
            setNewPassworderror('New Password Required!');
            return;
        }
        setNewPassword(password);
        setNewPassworderror(null);
        return;
    }

    //check password validation
    const setRePasswordCheck = (repassword) => {
        if (!repassword || repassword.length <= 0) {
            setRePassworderror('Confirm Required!');
            return;
        }
        setRePassword(repassword);
        setRePassworderror(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setNewPassword(null);
        setNewPassworderror(null);
        setRePassword(null);
        setRePassworderror(null);
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async () => {
        axiosConfig(null);
        if (!newPassword || !rePassword) {
            setNewPasswordCheck(newPassword);
            setRePasswordCheck(rePassword);
            return;
        }

        if (newPassword != rePassword) {
            setRePassworderror(`Can't Match Confirm Password`);
            setNewPassworderror(`Can't Match Password`);
            return;
        }

        const body = {
            "newpassword": newPassword,
            "username": userName
        }
        setloading(true);
        try {
            const response = await ForgetPasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                Toast.show('Your Password is Reset', Toast.SHORT);
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show('Something wrong, try again letter!', Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.containerView}>
                        <Image source={IMAGE.LOCK_ICON} style={{ height: 80, width: 80, marginTop: 80, marginBottom: 50, tintColor: COLOR.DEFALUTCOLOR }} />
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <View>
                                <TextInput
                                    selectionColor={COLOR.DEFALUTCOLOR}
                                    placeholder="NewPassword"
                                    placeholderTextColor={COLOR.WHITE}
                                    selectionColor={COLOR.WHITE}
                                    style={!newPassworderror ? styles.inputTextView : styles.inputTextViewError}
                                    returnKeyType="next"
                                    defaultValue={newPassword}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => secondTextInputRef.current.focus()}
                                    onChangeText={(password) => setNewPasswordCheck(password)}
                                />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -5, marginBottom: 5 }}>{newPassworderror}</Text>
                            </View>

                            <View>
                                <TextInput
                                    selectionColor={COLOR.DEFALUTCOLOR}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={COLOR.WHITE}
                                    selectionColor={COLOR.WHITE}
                                    style={!rePassworderror ? styles.inputTextView : styles.inputTextViewError}
                                    defaultValue={rePassword}
                                    returnKeyType="done"
                                    blurOnSubmit={false}
                                    ref={secondTextInputRef}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    onChangeText={(repassword) => setRePasswordCheck(repassword)}
                                />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -5, marginBottom: 5 }}>{rePassworderror}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.forgotButton} onPress={() => onPressSubmit()}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading == true ? <Loader /> : null}
        </SafeAreaView>
    );
}
export default NewPasswordScreen;
const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        marginBottom: 5,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 5,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
    },
    forgotButton: {
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 0,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});

