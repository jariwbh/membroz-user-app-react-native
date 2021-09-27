import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity, FlatList,
    View, Image, Text, StatusBar, RefreshControl
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import styles from './MeetingStyle';
import * as LocalService from '../../services/LocalService/LocalService';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import { groupClassService, onlineMeetingService } from '../../services/ScheduleService/ScheduleService';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;

const OnlineMeetingScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [meetingList, setMeetingList] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [groupID, setGroupID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const today = moment().format('YYYY-MM-DD');

    useEffect(() => {
        setLoading(true);
        getMemberDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, meetingList, memberID, groupID, refreshing])

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        setMemberID(memderInfo._id);
        getgroupId(memderInfo._id);
    }

    const getgroupId = async (memberID) => {
        try {
            const response = await groupClassService(memberID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                let groupArry = [];
                response.data.forEach(element => {
                    groupArry.push(element._id);
                });
                setGroupID(groupArry);
                getMeetingList(memberID, groupArry);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    const getMeetingList = async (memberID, groupID) => {
        try {
            const response = await onlineMeetingService(memberID, groupID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setMeetingList(response.data);
                    setLoading(false);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    const openWebView = (url) => {
        if (url) {
            return props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { url })
        }
    }

    //RENDER EXERCISE USING FLATLIST
    const renderMeeting = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
            <View style={styles.rectangleView}>
                <Text style={styles.subjectText}>{item && item.refid && item.refid.category && item.refid.category.property && item.refid.category.property.name}</Text>
                <View style={{ flexDirection: KEY.ROW }}>
                    <Text style={styles.timeText}>{moment(item && item.timeslot && item.timeslot.starttime, "HH:mm:ss").format("hh:mm A") + ' - ' + moment(item && item.timeslot && item.timeslot.endtime, "HH:mm:ss").format("hh:mm A")}</Text>
                    <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 15 }}>
                        {
                            item && item.property && item.property.onlinemeet &&
                            <TouchableOpacity
                                disabled={moment(item.appointmentdate).format('YYYY-MM-DD') == today ? false : true}
                                onPress={() => openWebView(item.property.onlinemeeturl)} style={styles.joinView}>
                                <Text style={styles.joinText}>Join Now</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 5, borderBottomColor: COLOR.TAUPE_GRAY, borderBottomWidth: 1, width: WIDTH - 60, marginLeft: 15 }} />
                <View style={{ flexDirection: KEY.ROW, marginRight: 15, marginBottom: 5 }}>
                    <Text style={styles.timeText}>{item && item.host && item.host.fullname}</Text>
                    <View style={{ alignItems: KEY.FLEX_END, marginLeft: -10 }}>
                        <Text style={styles.subjectText}>{moment(item && item.appointmentdate).format('ll')}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    const onRefresh = () => {
        setrefreshing(true);
        getMeetingList(memberID, groupID);
        wait(3000).then(() => setrefreshing(false));
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(meetingList == null) || (meetingList && meetingList.length > 0)
                ?
                <FlatList
                    style={{ marginTop: 15 }}
                    data={meetingList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderMeeting}
                    contentContainerStyle={{ paddingBottom: 10, alignSelf: KEY.CENTER, marginTop: 0 }}
                    keyExtractor={item => item._id}
                    keyboardShouldPersistTaps={"always"}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            title="Pull to refresh"
                            tintColor={COLOR.DEFALUTCOLOR}
                            titleColor={COLOR.DEFALUTCOLOR}
                            colors={[COLOR.DEFALUTCOLOR]}
                            onRefresh={onRefresh} />
                    }
                />
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                    </View>
                    : <Loader />
            }
        </SafeAreaView>
    );
}
export default OnlineMeetingScreen;


