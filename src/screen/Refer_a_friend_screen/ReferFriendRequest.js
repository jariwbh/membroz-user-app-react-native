import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar
} from 'react-native';
import { ReferFriendService } from '../../services/ReferFriendService/ReferaFriendService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;

const ReferFriendRequest = (props) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [fullnameError, setfullnameError] = useState(null);
    const [mobileno, setMobileno] = useState(null);
    const [mobilenoError, setMobilenoError] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailError, setEmailerror] = useState(null);
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading])

    //check validation of fullname
    const checkFullname = (fullname) => {
        if (!fullname || fullname <= 0) {
            return setfullnameError(languageConfig.fullnameerror);
        }
        setFullname(fullname);
        setfullnameError(null);
        return;
    }

    //check validation of email
    const checkEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            setEmailerror(languageConfig.emailerror);
            setEmail(null);
            return;
        }
        if (!re.test(email)) {
            setEmailerror(languageConfig.emailinvalid);
            setEmail(null);
            return;
        }
        setEmail(email);
        setEmailerror(null);
        return;
    }

    //check validation of mobile number
    const checkMobileNumber = (mobile) => {
        // const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            setMobileno(null);
            setMobilenoError(languageConfig.mobileerror);
            return;
        }
        // if (!reg.test(mobile)) {
        //     setmobileno(null);
        //     setmobilenoerror(languageconfig.mobileinvalid);
        //     return;
        // }
        setMobileno(mobile);
        setMobilenoError(null);
        return;
    }

    // GET USER DATA LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        setUserID(memderInfo._id);
    }

    //ONPRESS SUBMIT BUTTON CLICK TO CALLED
    const onPressSubmit = async () => {
        if (!email || !fullname || !mobileno) {
            checkEmail(email);
            checkFullname(fullname);
            checkMobileNumber(mobileno);
            return;
        }
        setLoading(true);
        try {
            let body = {
                "property": {
                    "fullname": fullname,
                    "primaryemail": email,
                    "mobile": mobileno,
                    "handlerid": userID,
                },
                "handlerid": userID,
                "fullname": fullname
            }
            const response = await ReferFriendService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                Toast.show(languageConfig.submittedsuccessfully, Toast.SHORT);
                resetScreen();
                props.navigation.navigate(SCREEN.REFERFRIENDSCREEN);
            }
        } catch (error) {
            Toast.show(languageConfig.submittedproblem, Toast.SHORT);
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //reset all fields
    const resetScreen = () => {
        setFullname(null);
        setfullnameError(null);
        setEmail(null);
        setEmailerror(null);
        setMobileno(null);
        setMobilenoError(null);
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containView}>
                    <View style={{ justifyContent: KEY.CENTER }}>
                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder={languageConfig.fullnameplaceholder}
                            style={fullnameError == null ? styles.inputTextStyle : styles.inputTextStyleError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={fullname}
                            blurOnSubmit={false}
                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                            onChangeText={(name) => checkFullname(name)} />

                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder={languageConfig.mobileplaceholder}
                            keyboardType='number-pad'
                            style={mobilenoError == null ? styles.inputTextStyle : styles.inputTextStyleError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={mobileno}
                            blurOnSubmit={false}
                            ref={secondTextInputRef}
                            onSubmitEditing={() => thirdTextInputRef.current.focus()}
                            onChangeText={(mobileno) => checkMobileNumber(mobileno)} />

                        <TextInput
                            selectionColor={COLOR.DEFALUTCOLOR}
                            placeholder={languageConfig.emailplaceholder}
                            keyboardType='email-address'
                            style={emailError == null ? styles.inputTextStyle : styles.inputTextStyleError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={email}
                            ref={thirdTextInputRef}
                            blurOnSubmit={false}
                            onChangeText={(email) => checkEmail(email)} />

                        <TouchableOpacity style={styles.btnSubmit} onPress={() => onPressSubmit()} >
                            <Text style={styles.btnText}>{languageConfig.submit}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default ReferFriendRequest;



