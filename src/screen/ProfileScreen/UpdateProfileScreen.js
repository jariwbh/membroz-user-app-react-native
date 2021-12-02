import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar, Modal, Keyboard
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import styles from './UpdateProfileStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as LocalService from '../../services/LocalService/LocalService';
import * as ImagePicker from "react-native-image-picker";
import Loader from '../../components/loader/index';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import { CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import MyPermissionController from '../../helpers/appPermission';
import { patchUserService } from '../../services/UserService/UserService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const UpdateProfileScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [userProfilePic, setUserprofilePic] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userNameError, setUserNameError] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userEmailError, setUserEmailError] = useState(null);
    const [userMoblie, setUserMobile] = useState(null);
    const [userMoblieError, setUserMobileError] = useState(null);
    const [userBirthDate, setUserBirthDate] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [userPincode, setUserPincode] = useState(null);
    const [userProfileName, setUserProfileName] = useState(null);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();
    const fourTextInputRef = React.createRef();
    const fiveTextInputRef = React.createRef();
    const sixTextInputRef = React.createRef();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        checkPermission();
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, userID, userProfilePic, userInfo, userEmail, userName, userNameError, userEmailError,
        userMoblieError, userMoblie, userBirthDate, userAddress, userPincode, userProfileName])

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserInfo(userInfo);
        setUserID(userInfo?._id);
        setUserProfileName(userInfo?.fullname);
        setUserName(userInfo?.fullname);
        setUserprofilePic(userInfo?.profilepic);
        setUserEmail(userInfo?.property?.primaryemail);
        setUserMobile(userInfo?.property?.mobile);
        setUserBirthDate(userInfo?.property?.date_of_birth);
        setUserAddress(userInfo?.property?.address);
        setUserPincode(userInfo?.property?.pincode && userInfo?.property?.pincode.toString());
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let datetime = moment(date).format()
        setUserBirthDate(datetime);
        hideDatePicker();
    };

    //check validation of fullname
    const checkFullName = (fullname) => {
        if (!fullname || fullname.length <= 0) {
            setUserNameError('Fullname can not be empty');
            setUserName(fullname);
            return;
        }
        setUserName(fullname);
        setUserNameError(null);
        return;
    }

    //check validation of email
    const checkEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            setUserEmailError('Email Id can not be empty');
            return;
        }
        if (!re.test(email)) {
            setUserEmailError('Enter valid email address');
            return;
        }
        setUserEmail(email);
        setUserEmailError(null);
        return;
    }

    //check validation of mobile number
    const checkMobile = (mobile) => {
        const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            setUserMobileError('Mobile Number cannot be empty');
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

    //check permission 
    const checkPermission = () => {
        setTimeout(
            () => {
                MyPermissionController.checkAndRequestStoragePermission()
                    .then((granted) => console.log('>Storage Permission Granted'))
                    .catch((err) => console.log(err))
            },
            500
        );
    }

    //IMAGE CLICK TO GET CALL FUNCTION
    const handlePicker = (value, options) => {
        if (value == 'gallery') {
            ImagePicker.launchImageLibrary(options, response => {
                if (response.didCancel) {
                    setloading(false);
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    setloading(false);
                    //firebase.crashlytics().recordError(response.error);
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    setloading(false);
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    setloading(true);
                    onPressUploadFile(response.assets[0]);
                }
            });
        } else if (value == 'camera') {
            ImagePicker.launchCamera(options, response => {
                if (response.didCancel) {
                    setloading(false);
                    //console.log('User cancelled image picker');
                } else if (response.error) {
                    setloading(false);
                    firebase.crashlytics().recordError(response.error);
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    setloading(false);
                    // console.log('User tapped custom button: ', response.customButton);
                } else {
                    setloading(true);
                    onPressUploadFile(response.assets[0]);
                }
            });
        }
    }

    //Upload Cloud storage function
    const onPressUploadFile = async (fileObj) => {
        if (fileObj != null) {
            const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
            await RNFetchBlob.fetch('POST', CLOUD_URL, { 'Content-Type': 'multipart/form-data' },
                Platform.OS === 'ios' ?
                    [{ name: 'file', filename: fileObj.fileSize, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
                    :
                    [{ name: 'file', filename: fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(fileObj.uri) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
            )
                .then(response => response.json())
                .then(data => {
                    setloading(false);
                    if (data && data.url) {
                        setUserprofilePic(data.url);
                        UpdateProfilePictureService(data.url);
                    }
                }).catch(error => {
                    firebase.crashlytics().recordError(error);
                    alert("Uploading Failed!");
                })
        } else {
            alert('Please Select File');
        }
    }

    //UPDATE PROFILE PICTURE API CALL
    const UpdateProfilePictureService = async (profilepic) => {
        let user = userInfo;
        user.profilepic = profilepic;
        try {
            const response = await patchUserService(userID, user);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                LocalService.AuthenticateUser(response.data);
                Toast.show('Your Profile Updated', Toast.LONG);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
            Toast.show('Your Profile Not Update', Toast.LONG);
        }
    }

    //MODAL POPUP SHOW TO CALL FUNCTION
    const uploadImageOption = (value) => {
        checkPermission();
        handlePicker(value);
        setshowMessageModalVisible(false);
    }

    //UPDATE PROFILE PICTURE API CALL
    const UpdateProfileService = async () => {
        if (!userMoblie || !userEmail || !userName) {
            checkFullName(userName);
            checkEmail(userEmail);
            checkMobile(userMoblie);
            return;
        }
        setloading(true);
        let user = userInfo;
        user.property.primaryemail = userEmail;
        user.property.mobile = userMoblie;
        user.property.date_of_birth = userBirthDate;
        user.property.address = userAddress;
        user.property.pincode = Number(userPincode);
        user.property.fullname = userName;
        user.fullname = userName;
        try {
            const response = await patchUserService(userID, user);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                props.navigation.navigate(SCREEN.PROFILESCREEN);
                LocalService.AuthenticateUser(response.data);
                setloading(false);
                Toast.show('Your Profile Updated', Toast.LONG);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setloading(false);
            Toast.show('Your Profile Not Update', Toast.LONG);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: !showMessageModalVisible ? COLOR.BACKGROUNDCOLOR : 'rgba(0,0,0,0.5)' }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <TouchableOpacity onPress={() => { setshowMessageModalVisible(true) }}>
                        <View style={styles.viweRound}>
                            <Image source={!userProfilePic ? IMAGE.USERPROFILE : { uri: userProfilePic }}
                                style={!userProfilePic ? { height: 70, width: 70 } : { height: 95, width: 95, borderRadius: 100 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, marginBottom: 20, marginLeft: 20, marginRight: 20, textTransform: KEY.CAPITALIZE }} >{userProfileName}</Text>

                    <View>
                        <TextInput
                            placeholder="UserName"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            style={userNameError == null ? styles.inputTextView : styles.inputTextViewError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userName}
                            blurOnSubmit={false}
                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                            onChangeText={(fullname) => checkFullName(fullname)}
                        />
                        {userNameError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{userNameError}</Text>}
                    </View>

                    <View>
                        <TextInput
                            placeholder="Email"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            keyboardType={KEY.EMAILADDRESS}
                            style={userEmailError == null ? styles.inputTextView : styles.inputTextViewError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userEmail}
                            blurOnSubmit={false}
                            ref={secondTextInputRef}
                            onSubmitEditing={() => thirdTextInputRef.current.focus()}
                            onChangeText={(email) => checkEmail(email)}
                        />
                        {userEmailError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{userEmailError}</Text>}
                    </View>

                    <View>
                        <TextInput
                            placeholder="Mobile Number"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            keyboardType={KEY.NUMBER_PAD}
                            style={userMoblieError == null ? styles.inputTextView : styles.inputTextViewError}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={userMoblie}
                            blurOnSubmit={false}
                            ref={thirdTextInputRef}
                            onSubmitEditing={() => fourTextInputRef.current.focus()}
                            onChangeText={(mobile) => checkMobile(mobile)}
                        />
                        {userMoblieError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginTop: -10, marginBottom: 5 }}>{userMoblieError}</Text>}
                    </View>

                    <View>
                        <TextInput
                            placeholder="Date Of Birth"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            style={styles.inputTextView}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            onFocus={() => showDatePicker()}
                            onTouchEnd={() => Keyboard.dismiss()}
                            defaultValue={userBirthDate && moment(userBirthDate).format('YYYY-MM-DD')}
                            ref={fourTextInputRef}
                            onSubmitEditing={() => fiveTextInputRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>

                    <View>
                        <TextInput placeholder="Address"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            style={styles.addressView}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.NEXT}
                            multiline={true}
                            numberOfLines={3}
                            defaultValue={userAddress}
                            blurOnSubmit={false}
                            ref={fiveTextInputRef}
                            onSubmitEditing={() => sixTextInputRef.current.focus()}
                            onChangeText={(address) => setUserAddress(address)}
                        />
                    </View>

                    <View>
                        <TextInput placeholder="PinCode"
                            selectionColor={COLOR.DEFALUTCOLOR}
                            keyboardType={KEY.NUMBER_PAD}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.DONE}
                            style={styles.inputTextView}
                            defaultValue={userPincode}
                            blurOnSubmit={false}
                            ref={sixTextInputRef}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(pincode) => setUserPincode(pincode)}
                        />
                    </View>

                    <TouchableOpacity style={styles.updateBtn} onPress={() => UpdateProfileService()}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}>
                <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0 }}>
                        <View style={styles.msgModalView}>
                            <TouchableOpacity onPress={() => uploadImageOption('camera')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15 }}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => uploadImageOption('gallery')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15, marginBottom: 10 }}>Choose From Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setshowMessageModalVisible(false)} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 10, marginBottom: 10 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
export default UpdateProfileScreen;

