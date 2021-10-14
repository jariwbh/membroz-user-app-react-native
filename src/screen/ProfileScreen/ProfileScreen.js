import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    StatusBar, Modal, Platform, Linking
} from 'react-native';
import styles from './ProfileStyle';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { AUTHUSER, AUTHUSERINFO } from '../../context/actions/type';
import * as LocalService from '../../services/LocalService/LocalService';
import moment from 'moment';
import { RemoteService } from '../../services/RemortService/RemortService';
import { useFocusEffect } from '@react-navigation/native';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProfileScreen = (props) => {
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [fullName, setFullname] = useState(null);
    const [userNumber, setuserNumber] = useState(null);
    const [rateusAndroid, setrateusAndroid] = useState(null);
    const [rateusIos, setRateUsIos] = useState(null);
    const [userDesignation, setUserDesignation] = useState(null);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getUserDeatilsLocalStorage();
            RemoteController();
        }, [])
    )

    useEffect(() => {
    }, [userProfilePic, fullName, userNumber, rateusAndroid, rateusIos, userDesignation]);

    // REMOTECONTROLLER USE TO AUTOCONFIG APP
    const RemoteController = async () => {
        var getUser = await RemoteService();
        if (getUser) {
            setrateusAndroid(getUser.playstoreid);
            setRateUsIos(getUser.appstoreid);
        };
    };

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserDesignation(userInfo.designationid.title)
        setUserProfilePic(userInfo.profilepic);
        setFullname(userInfo.fullname)
        setuserNumber(userInfo.usernumber);
    }

    //LogOut Button click to call 
    const onPressLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log out", onPress: () => {
                        AsyncStorage.removeItem(AUTHUSERINFO);
                        // AsyncStorage.removeItem(REMOVEDATA);
                        AsyncStorage.removeItem(AUTHUSER);
                        Toast.show('Log out Success', Toast.SHORT);
                        props.navigation.replace(SCREEN.AUTH);
                    }
                }
            ]
        );
    }

    const onPressRateUs = () => {
        setshowMessageModalVisible(!showMessageModalVisible);
        if (Platform.OS != 'ios') {
            Linking.openURL(`market://details?id=${rateusAndroid}`);
        } else {
            Linking.openURL(`itms://itunes.apple.com/in/app/apple-store/${rateusIos}`);
        }
    }

    return (
        !showMessageModalVisible ?
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.viewMain}>
                        <View style={styles.viewRound}>
                            <Image source={!userProfilePic ? IMAGE.USERPROFILE : { uri: userProfilePic }}
                                style={!userProfilePic ? { height: 70, width: 70 } : { height: 95, width: 95, borderRadius: 100 }} />
                        </View>
                        <Text style={styles.textName}>{fullName}</Text>
                        <Text style={styles.textSansThin}>{userDesignation}</Text>
                    </View>

                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 20 }}>
                        <View style={{ justifyContent: KEY.FLEX_START }}>
                            <Text style={styles.textInfo}>Full Name</Text>
                        </View>
                        <View style={{ justifyContent: KEY.FLEX_END }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE }}>{fullName}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.UPDATEPROFILESCREEN)}>
                        <View style={styles.viewRectangle}>
                            <Image source={IMAGE.PENCIL_ICON_SIMPLE} resizeMode={KEY.CONTAIN} style={{ height: 20, width: 20, tintColor: COLOR.DEFALUTCOLOR, margin: 15 }} />
                            <Text style={{ marginTop: 15, fontSize: FONT.FONT_SIZE_17, color: COLOR.TAUPE_GRAY, fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10 }}>Update Profile</Text>
                            <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                <Icon name='chevron-right' size={40} style={{ color: COLOR.TAUPE_GRAY, marginTop: 5 }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.PASSWORDCHANGESCREEN)}>
                        <View style={styles.viewRectangle}>
                            <Image source={IMAGE.PADLOCK} resizeMode={KEY.CONTAIN} style={{ height: 25, width: 25, tintColor: COLOR.DEFALUTCOLOR, margin: 15 }} />
                            <Text style={{ marginTop: 15, fontSize: FONT.FONT_SIZE_17, color: COLOR.TAUPE_GRAY, fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10 }}>Change Password</Text>
                            <View style={{ alignItems: KEY.FLEX_END, marginLeft: 10, flex: 1, marginRight: 12 }}>
                                <Icon name='chevron-right' size={40} style={{ color: COLOR.TAUPE_GRAY, marginTop: 5 }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setshowMessageModalVisible(true)}>
                        <View style={styles.viewRectangle}>
                            <Image source={IMAGE.REVIEW} resizeMode={KEY.CONTAIN} style={{ height: 25, width: 25, tintColor: COLOR.DEFALUTCOLOR, margin: 15 }} />
                            <Text style={{ marginTop: 15, fontSize: FONT.FONT_SIZE_17, color: COLOR.TAUPE_GRAY, fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10 }}>Rate Us</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPressLogout()}>
                        <View style={styles.viewRectangle}>
                            <Image source={IMAGE.LOGOUT} resizeMode={KEY.CONTAIN} style={{ height: 25, width: 25, tintColor: COLOR.DEFALUTCOLOR, margin: 15 }} />
                            <Text style={{ marginTop: 15, fontSize: FONT.FONT_SIZE_17, color: COLOR.TAUPE_GRAY, fontWeight: FONT.FONT_WEIGHT_BOLD, marginLeft: 10 }}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 70 }} />
                </ScrollView>
            </SafeAreaView>
            :
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
                {/* message model Pop */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showMessageModalVisible}
                    onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}>
                    <View style={{ flex: 1, alignItems: KEY.CENTER, justifyContent: KEY.CENTER }}>
                        <View style={styles.msgModalView}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_22, color: COLOR.BLACK, marginLeft: 15, marginTop: 15 }}>Rate this app</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY, marginLeft: 15, marginRight: 15, marginTop: 20 }}>If you like this app,please take a little bit of your time to review it!</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY, marginLeft: 15, marginRight: 15 }}>It really helps us and it shouldn't take you more than one minute.</Text>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20, marginLeft: WIDTH / 2 - 80 }}>
                                <TouchableOpacity onPress={() => onPressRateUs()} >
                                    <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 25, color: COLOR.DEFALUTCOLOR }}>RATE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setshowMessageModalVisible(false)} >
                                    <Text style={{ fontSize: FONT.FONT_SIZE_14, marginLeft: 25, color: COLOR.DEFALUTCOLOR }}>NO THANKS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
    );
}
export default ProfileScreen;