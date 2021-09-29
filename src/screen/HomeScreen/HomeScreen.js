import {
  SafeAreaView, ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform, Alert, Linking, Share
} from 'react-native';
import { getByIdUserService, patchUserService } from '../../services/UserService/UserService';
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { REMOTEDATA, MESSAGINGSENDERID } from '../../context/actions/type';
import React, { useEffect, useState } from 'react';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HomeStyle';
import Loader from '../../components/loader/index';
import { GalleryService } from '../../services/GalleryService/GalleryService';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import crashlytics from "@react-native-firebase/crashlytics";

//STATIC VARIABLE 
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

//STATIC DATA
let MenuDefaultArray = [
  { "menuname": "freshlead", "title": "Fresh Call", "screenname": "FreshLeadScreen", "colorcode": "#2AAA63", "imageurl": IMAGE.PHONE_WITH_WIRE, "height": 25, "width": 25 },
  { "menuname": "followup", "title": "Follow Up", "screenname": "FollowupScreen", "colorcode": "#FF4D4D", "imageurl": IMAGE.CLOCK, "height": 25, "width": 25 },
  { "menuname": "meeting", "title": "Meeting", "screenname": "MeetingScreen", "colorcode": "#007AFF", "imageurl": IMAGE.IC_GROUP, "height": 25, "width": 25 },
  { "menuname": "mylead", "title": "My Lead", "screenname": "MyLeadScreen", "colorcode": "#B366FF", "imageurl": IMAGE.PORTFOLIO, "height": 25, "width": 25 },
  { "menuname": "attendance", "title": "Attendance", "screenname": "AttendanceScreen", "colorcode": "#CFD13B", "imageurl": IMAGE.ATTENDANCE_ICON, "height": 25, "width": 25 },
  { "menuname": "calender", "title": "Calender", "screenname": "CalendarScreen", "colorcode": "#FF8D7F", "imageurl": IMAGE.CALENDER_ICON, "height": 25, "width": 25 },
  { "menuname": "support", "title": "Support", "screenname": "SupportScreen", "colorcode": "#F9C688", "imageurl": IMAGE.SUPPORT_ICON, "height": 31, "width": 16 },
  { "menuname": "booking", "title": "Book a Holiday", "screenname": "MyBookingScreen", "colorcode": "#FCD138", "imageurl": IMAGE.IC_LIBRARY, "height": 25, "width": 25 },
  { "menuname": "event", "title": "Event", "screenname": "EventScreen", "colorcode": "#C889F2", "imageurl": IMAGE.IC_EVENT, "height": 25, "width": 25 },
  { "menuname": "announcement", "title": "Announcement", "screenname": "AnnouncementScreen", "colorcode": "#CFD03B", "imageurl": IMAGE.NOTICE_OUTLINE, "height": 25, "width": 25 },
  { "menuname": "referfriend", "title": "Refer a Friend", "screenname": "ReferFriendScreen", "colorcode": "#2AAA63", "imageurl": IMAGE.IC_GROUP, "height": 25, "width": 25 },
];

//HOME SCREEN FUNCTION
const HomeScreen = (props) => {
  const [loading, setloading] = useState(true);
  const [backgroungImage, setBackgroungImage] = useState(null);
  const [mobileapppermissions, setMobileAppperMissions] = useState(null);
  const [scanIconVisible, setScanIconVisible] = useState(false);
  const [sharedIconVisible, setSharedIconVisible] = useState(false);
  const [notificationIconVisible, setNotificationIconVisible] = useState(false);
  const [notification, setNotification] = useState(0);
  const [userDesignation, setUserDesignation] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [photoCounter, setPhotoCounter] = useState(0);
  const [shareusAndroid, setSharesAndroid] = useState(null);
  const [shareusIos, setShareUsIos] = useState(null);
  let getuserid, appVersionCode, androidUrl, iosUrl;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getUserDeatilsLocalStorage();
  //   }, [])
  // );

  useEffect(() => {
    // CHECK REMOTECONTROLLER USE TO AUTOCONFIG APP
    RemoteController();
    getUserDeatilsLocalStorage();
    MenuPermission();
    getGalleryImages();
  }, []);

  useEffect(() => {
  }, [loading, backgroungImage, scanIconVisible, sharedIconVisible, notificationIconVisible, photoCounter,
    mobileapppermissions, notification, userDesignation, userName, userID, userProfilePic, shareusAndroid, shareusIos
  ])

  //TIME OUT FUNCTION
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  // REMOTECONTROLLER USE TO AUTOCONFIG APP
  const RemoteController = async () => {
    var getUser = await AsyncStorage.getItem(REMOTEDATA);
    var userData = JSON.parse(getUser);
    if (userData) {
      setBackgroungImage(userData.homeimage);
      setScanIconVisible(userData.scanicon);
      setSharedIconVisible(userData.sharedicon);
      setNotificationIconVisible(userData.notificationicon);
      setSharesAndroid(userData.playstoreid);
      setShareUsIos(userData.appstoreid);
      appVersionCode = userData.appversioncode;
      androidUrl = userData.playstoreid;
      iosUrl = userData.appstoreid;
    };
  };

  //GET USER DATA IN MOBILE LOCAL STORAGE
  const getUserDeatilsLocalStorage = async () => {
    var userInfo = await LocalService.LocalStorageService();
    getuserid = userInfo?._id;
    setUserDesignation(userInfo?.designationid?.title.substring(0, 15));
    setUserName(userInfo?.fullname.substring(0, 15));
    setUserID(userInfo?._id);
    getUserDeatils(userInfo?._id);
    getNotification(userInfo?._id);
    setUserProfilePic(userInfo?.profilepic);
    PushNotifications();
    await getAppVersion(appVersionCode);
    wait(1000).then(() => {
      setloading(false);
    });
  }

  //GET USER DATA USEING API CALL
  const getUserDeatils = async (id) => {
    try {
      const response = await getByIdUserService(id);
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        if (response.data.message === 'You do not have permission') {
          setloading(false);
          LocalService.RemoveAuthenticateUser();
          props.navigation.replace(SCREEN.AUTH);
        } else {
          Toast.show('Welcome', Toast.SHORT, Toast.BOTTOM);
          LocalService.AuthenticateUser(response.data);
        }
      }
    } catch (error) {
      firebase.crashlytics().recordError(error);
      setloading(false);
    }
  }

  //GET IMAGE GALLERY COUNT API DATA GET
  const getGalleryImages = async () => {
    try {
      const response = await GalleryService();
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        setPhotoCounter(response.data.length);
      }
    } catch (error) {
      firebase.crashlytics().recordError(error);
      setloading(false);
    }
  }

  //CHECK MENU PERMISSION FUNCTION
  const MenuPermission = async () => {
    var userInfo = await LocalService.LocalStorageService();
    if (userInfo) {
      //let mobileapppermissions = userInfo.role.mobileapppermissions;
      let mobileapppermissions = ["freshlead", "followup", "meeting", "mylead", "calender", "support"];
      let finalMenuPermission = [];
      MenuDefaultArray.forEach(menuEle => {
        mobileapppermissions.forEach(MobileEle => {
          if (menuEle.menuname === MobileEle) {
            finalMenuPermission.push(menuEle)
          }
        });
      });
      setMobileAppperMissions(finalMenuPermission);
    }
  }

  //GET IMAGE GALLERY COUNT API DATA GET
  const getNotification = async (id) => {
    try {
      const response = await NotificationService(id);
      setNotification(response.data.length);
    } catch (error) {
      firebase.crashlytics().recordError(error);
      setloading(false);
    }
  }

  //MENU RENDER FUNCTION
  const renderMenu = (item) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(item.item.screenname)} style={{ marginBottom: 5 }}>
      <View style={WIDTH <= 420 ? styles(item.item.colorcode).viewSquareTwoColumn : styles(item.item.colorcode).viewSquareThreeColumn}>
        <View style={{
          height: 50, width: 50, marginBottom: 10, backgroundColor: item.item.colorcode, borderRadius: 100,
          justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 15, marginLeft: 20
        }}>
          <Image source={item.item.imageurl} style={{ height: item.item.height, width: item.item.width }} />
        </View>
        <Text numberOfLines={1} style={{ flex: 1, fontSize: FONT.FONT_SIZE_18, marginLeft: 20, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.MENU_TEXT_COLOR }}>{item.item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  //PUSHNOTIFICATION BACKGROUND FUNCTION
  const PushNotifications = async () => {
    let fcmToken = await firebase.messaging().getToken();
    if (fcmToken != undefined) {
      getFcmToken(fcmToken);
    }
    //PUSH NOTIFICATION FUNCTION
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        //console.log(`token.token`, token.token)
        //getFcmToken(token.token)
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        if (notification.foreground) {
          notification.data = {
            message: notification.message,
            title: notification.title
          }
          //   console.log("NOTIFICATION:", notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        // console.log("ACTION:", notification.action);
        // console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      senderID: MESSAGINGSENDERID,
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  //GET MESSAGE TOKEN
  const getFcmToken = async (fcmToken) => {
    let uniqueId;
    let deviceInfo;
    if (Platform.OS === 'android') {
      uniqueId = await DeviceInfo.getAndroidId()
      if (fcmToken) {
        deviceInfo = {
          anroiddevice: {
            "deviceid": uniqueId,
            "registrationid": fcmToken
          }
        }
        await UserPatch(deviceInfo);
      }
    } else {
      uniqueId = await DeviceInfo.getUniqueId();
      if (fcmToken) {
        deviceInfo = {
          iosdevice: {
            "deviceid": uniqueId,
            "registrationid": fcmToken
          }
        }
        await UserPatch(deviceInfo);
      }
    }
  }

  //UPDATE USER INFORMATION API CALL
  const UserPatch = async (deviceInfo) => {
    try {
      const response = await patchUserService(getuserid, deviceInfo);
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        console.log(`UPDATE DONE`);
      }
    }
    catch (error) {
      firebase.crashlytics().recordError(error);
      setloading(false);
    }
  }

  //ALERT BUTTON APP VERSIONCODE
  const checkAlertResponse = () =>
    Alert.alert(
      "Warning",
      Platform.OS === KEY.IOS ?
        "Please Update the app in App store otherwise cancle to close app."
        : "Please Update the app in Play store otherwise cancle to close app.",
      [
        {
          text: "Close",
          onPress: () => {
            if (Platform.OS === KEY.IOS) {
              RNExitApp.exitApp();
            } else {
              RNExitApp.exitApp();
            }
          }
        },
        {
          text: "Update Now", onPress: () => {
            if (Platform.OS === KEY.IOS) {
              Linking.openURL(`itms://itunes.apple.com/in/app/apple-store/${iosUrl}`);
            } else {
              Linking.openURL(`market://details?id=${androidUrl}`);
            }
          }
        }
      ]
    );

  //CHECK APP VERSIONCODE
  const getAppVersion = (value) => {
    const appVersionCode = DeviceInfo.getVersion();
    if (appVersionCode != value) {
      return checkAlertResponse();
    }
  }

  //SHARE BUTTON CLICK
  const onPressShareButton = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: `Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=${androidUrl}&hl=en`,
        url: `https://play.google.com/store/apps/details?id=${androidUrl}&hl=en`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER }}>
      <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
      <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} resizeMode={KEY.COVER} style={{ width: WIDTH, height: HEIGHT }}>
        <View style={{ justifyContent: !scanIconVisible ? KEY.FLEX_END : KEY.SPACEBETWEEN || !sharedIconVisible ? KEY.SPACEBETWEEN : KEY.FLEX_END, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 35 }}>
          {
            scanIconVisible &&
            <TouchableOpacity>
              <Image source={IMAGE.IC_QRCODE} style={{ height: 25, width: 25, justifyContent: KEY.FLEX_START, alignItems: KEY.FLEX_START, tintColor: COLOR.WHITE, marginLeft: 15 }} />
            </TouchableOpacity>
          }

          {
            sharedIconVisible &&
            <TouchableOpacity onPress={() => onPressShareButton()}
              style={{ justifyContent: KEY.FLEX_START, alignItems: KEY.FLEX_START, marginLeft: !scanIconVisible ? WIDTH / 2 + 100 : WIDTH / 2 + 30, marginRight: !scanIconVisible ? 15 : 0, marginTop: !scanIconVisible ? 5 : 0 }}>
              <Image source={IMAGE.SHARE_ICON} style={{ height: 25, width: 25, tintColor: COLOR.WHITE }} />
            </TouchableOpacity>
          }

          {
            notificationIconVisible &&
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.NOTIFICATIONSCREEN)}
              style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, marginRight: 25, marginTop: !scanIconVisible ? 0 : -15 || !sharedIconVisible ? -10 : -15 }}>
              <Image source={IMAGE.BELL_ICON} style={{ height: 30, width: 25 }} />
              <View style={{ marginLeft: 0, marginTop: -40, height: 22, width: 22, borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, backgroundColor: COLOR.NOTIFICATION_COLOR }}>
                <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, fontSize: 12, color: COLOR.WHITE }}>{notification}</Text>
              </View>
            </TouchableOpacity>
          }
        </View>

        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
          <TouchableOpacity style={styles().viewPhoto} onPress={() => props.navigation.navigate(SCREEN.GALLERYSCREEN)}>
            <Image source={IMAGE.PICTURE_ICON} style={styles().picture_Icon_iconPhoto} />
            <Text style={{ color: COLOR.WHITE, marginTop: 0, marginLeft: 10 }}>{`${photoCounter}` + ' ' + 'Photos'} </Text>
            <Icon name='chevron-right' size={25} style={styles().arror_iconPhoto} />
          </TouchableOpacity>
        </View>

        <View style={styles().viewName}>
          <View style={styles().viweRound}>
            <Image source={!userProfilePic ? IMAGE.USERPROFILE : { uri: userProfilePic }}
              style={!userProfilePic ? { height: 70, width: 70 } : { height: 95, width: 95, borderRadius: 100 }} />
          </View>

          <View>
            <View style={{ flexDirection: KEY.COLUMN }}>
              <Text style={styles().text}>{userName}</Text>
              <Text style={{ color: COLOR.MENU_TEXT_COLOR, fontSize: FONT.FONT_SIZE_16, marginLeft: 5 }}>{userDesignation}</Text>
            </View>
          </View>

          <View style={styles().viewLine} />
          <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.UPDATEPROFILESCREEN)}>
            <Image source={IMAGE.PENCIL_ICON_SIMPLE} style={{ height: 20, width: 20, tintColor: COLOR.DEFALUTCOLOR, margin: 8 }} />
          </TouchableOpacity>
        </View>

        <View style={styles().viewMain}>
          <FlatList
            style={{ marginTop: 15 }}
            data={mobileapppermissions}
            numColumns={WIDTH <= 420 ? 2 : 3}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps={KEY.ALWAYS}
            renderItem={renderMenu}
            contentContainerStyle={{ paddingBottom: HEIGHT / 2 + 40, alignSelf: KEY.CENTER }}
          />
        </View>
      </ImageBackground>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
}
export default HomeScreen;