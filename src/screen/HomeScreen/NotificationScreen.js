import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView, TouchableOpacity,
    StatusBar, View, Text
} from 'react-native';
import * as NotificationService from '../../services/NotificationService/NotificationService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import languageConfig from '../../languages/languageConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as STYLES from './NotificationStyle';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;

const NotificationScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
    }, [loading, notificationList, userID, refreshing]);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setloading(true);
        getUserDeatilsLocalStorage();
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getNotification(userInfo._id);
    }

    //refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getNotification(UserId);
        wait(3000).then(() => setrefreshing(false));
    }

    //get Notification Api 
    const getNotification = async (id) => {
        try {
            const response = await NotificationService.NotificationService(id);
            setNotificationList(response.data);
            wait(1000).then(() => setloading(false));
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //render Notification on flatlist function
    const renderNotification = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }} >
            <Swipeable renderRightActions={() => RightActions(item)} onSwipeableRightOpen={() => swipeToDeleteNotification(item)}>
                <View style={STYLES.styles.notificationview}>
                    <View style={{ alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END, marginTop: 5 }}>
                        <Text style={{ fontSize: 12, marginRight: 20, color: COLOR.BLACK }}>
                            {item && item.createdAt && moment(item.createdAt).format('LL') == moment(item.createdAt).format('LL') ? moment(item.createdAt).format('LT') : moment(item.createdAt).format('LLL')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: KEY.ROW, flex: 1, marginTop: -30, marginLeft: 15, alignItems: KEY.CENTER }}>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={{ fontSize: 12, color: COLOR.DEFALUTCOLOR }} >{'# ' + item?.property?.subject}</Text>
                            <Text style={{ fontSize: 14, color: COLOR.DAVY_GREY }}>{item?.property?.message}</Text>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </View>
    )

    //swipe To Delete Notification function
    const swipeToDeleteNotification = async (item) => {
        try {
            const response = await NotificationService.getByIdNotificationDeleteService(item._id);
            if (response.data != null && response.data != undefined && response.status == 200)
                getNotification(userID);
        } catch (error) {
            firebase.crashlytics().recordError(error);
        }
    }

    //clear btn to all notification clear 
    const clearAllNotification = async () => {
        let clear = [];
        notificationList.forEach(ele => {
            clear.push(ele._id);
        });
        try {
            const response = await NotificationService.deleteAllNotificationService(clear);
            if (response.status === 200) {
                getNotification(userID);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
        }
    }

    //swipe To Delete Left Actions
    const RightActions = () => {
        return (
            <View
                style={{ flex: 1, backgroundColor: COLOR.DEFALUTCOLOR, justifyContent: KEY.CENTER }}>
                <Text
                    style={{
                        color: COLOR.BACKGROUNDCOLOR,
                        paddingHorizontal: 10
                    }}>
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH}
                style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(notificationList && notificationList.length > 0)
                ?
                <>
                    <View style={{ justifyContent: KEY.KEY.FLEX_END, alignItems: KEY.KEY.FLEX_END }}>
                        <TouchableOpacity onPress={() => clearAllNotification()}
                            style={STYLES.styles.submitbtn}>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{languageConfig.languageConfig}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ marginTop: 15 }}
                        data={notificationList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderNotification}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                title={languageConfig.pullrefreshtext}
                                tintColor={COLOR.DEFALUTCOLOR}
                                titleColor={COLOR.DEFALUTCOLOR}
                                colors={[COLOR.DEFALUTCOLOR]}
                                onRefresh={onRefresh} />
                        }
                        contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER, marginTop: 0 }}
                        keyExtractor={item => item._id}
                    />
                </>
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                    </View>
                    : <Loader />
            }
        </SafeAreaView>
    );
}

export default NotificationScreen;


