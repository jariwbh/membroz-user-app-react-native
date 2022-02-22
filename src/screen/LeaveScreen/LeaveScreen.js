import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View, FlatList, RefreshControl,
    StatusBar, TouchableOpacity, Pressable
} from 'react-native';
import { leaveRequestListService, leaveTypeService } from '../../services/LeaveService/LeaveService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment-timezone';
//import moment from 'moment';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;

export default LeaveScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [myLeaveList, setMyLeaveList] = useState([]);
    const [myLeaveFilterList, setMyLeaveFilterList] = useState([]);
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [selectLeaveType, setSelectLeaveType] = useState("all");
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getUserDeatilsLocalStorage();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setLoading(true);
        getLeaveType();
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, myLeaveList, leaveTypeList, selectLeaveType, myLeaveFilterList, userID, refreshing]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        moment.tz.setDefault(userInfo?.branchid?.timezone);
        setUserID(userInfo._id);
        getMyLeave(userInfo._id);
    }

    const onRefresh = () => {
        setrefreshing(true);
        getMyLeave(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MY LEAVE API THROUGH FETCH DATA
    const getMyLeave = async (userID) => {
        try {
            const response = await leaveRequestListService(userID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setMyLeaveList(response.data);
                    setMyLeaveFilterList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //LEAVE TYPE API THROUGH FETCH DATA
    const getLeaveType = async () => {
        try {
            const response = await leaveTypeService();
            if (response.data != null && response.data != 'undefind' && response.status == 200 && response.data.length > 0) {
                let catagory = [];
                catagory = response.data;
                setLeaveTypeList([{ _id: '12345678910', title: 'all', selected: true }, ...catagory]);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER MYLEAVE LIST USING FLATLIST
    const renderMyLeave = ({ item, index }) => (
        item.selected != true ?
            <TouchableOpacity onPress={() => onPressToSelectExpandLeave(item, index, true)}
                style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
                <View style={styles.boxView}>
                    <View
                        style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ marginLeft: 15, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            {!item.wfstatus &&
                                <MaterialCommunityIcons name='clock' size={40} style={{ color: COLOR.YELLOW, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "approved" &&
                                <MaterialCommunityIcons name='check-circle' size={40} style={{ color: COLOR.GREEN, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "pending" &&
                                <MaterialCommunityIcons name='clock' size={40} style={{ color: COLOR.YELLOW, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "declined" &&
                                <MaterialCommunityIcons name='minus-circle' size={40} style={{ color: COLOR.ERRORCOLOR, alignItems: KEY.CENTER }} />
                            }
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 0 }}>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD }}>{item.leavetype.title}</Text>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD }}>{moment(item?.property?.fromdate).format('DD MMM, YYYY') + ' - ' + moment(item?.property?.todate).format('DD MMM, YYYY')}</Text>
                            <Text style={{ fontSize: 12, color: COLOR.BLACK, marginLeft: 15 }}>{'Created At : ' + moment(item.createdAt).format('ll')}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => onPressToSelectExpandLeave(item, index, false)}
                style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
                <View style={styles.boxView}>
                    <View
                        style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ marginLeft: 15, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            {!item.wfstatus &&
                                <MaterialCommunityIcons name='clock' size={40} style={{ color: COLOR.YELLOW, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "approved" &&
                                <MaterialCommunityIcons name='check-circle' size={40} style={{ color: COLOR.GREEN, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "pending" &&
                                <MaterialCommunityIcons name='clock' size={40} style={{ color: COLOR.YELLOW, alignItems: KEY.CENTER }} />
                            }
                            {item.wfstatus && item.wfstatus.toLowerCase() == "declined" &&
                                <MaterialCommunityIcons name='minus-circle' size={40} style={{ color: COLOR.ERRORCOLOR, alignItems: KEY.CENTER }} />
                            }
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 0 }}>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD }}>{item.leavetype.title}</Text>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD }}>
                                {moment(item?.property?.fromdate).format('DD MMM, YYYY') + ' - ' + moment(item?.property?.todate).format('DD MMM, YYYY')}
                            </Text>
                            <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15 }}>
                                Notes : {item?.property && item?.property?.comment ? item.property.comment : " "}
                            </Text>
                            {
                                item?.property && item?.property?.halfday && item?.property?.halfday[0] &&
                                <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, textTransform: KEY.CAPITALIZE }}>
                                    Half Day : {item?.property && item?.property?.halfday && item?.property?.halfday[0] ? item.property.halfday[0] : "no"}
                                </Text>
                            }
                            <Text style={{ fontSize: 12, color: COLOR.BLACK, marginLeft: 15 }}>
                                {'Created At : ' + moment(item?.createdAt).format('ll')}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
    )

    const TabFilter = (title, index) => {
        const tab = leaveTypeList.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        let filterArray = [];
        if (title === 'all') {
            setMyLeaveFilterList(myLeaveList);
        } else {
            myLeaveList.forEach(element => {
                if (element.leavetype.title === title) {
                    filterArray.push(element);
                }
            });
            setMyLeaveFilterList(filterArray);
        }
        setSelectLeaveType(title);
    }

    //RENDER TAB MENU LIST USING FLATLIST
    const renderTabMenu = ({ item, index }) => (
        <TouchableOpacity style={[styles.btnTab, selectLeaveType === item.title]} onPress={() => TabFilter(item.title, index)}>
            <Text style={[styles.tabText, selectLeaveType === item.title && styles.tabTextActive]}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={styles.listTab}>
                <FlatList
                    style={{ marginTop: 0 }}
                    data={leaveTypeList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                    renderItem={renderTabMenu}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={{ marginTop: 10 }} />
            <FlatList
                data={myLeaveFilterList}
                showsVerticalScrollIndicator={false}
                renderItem={renderMyLeave}
                contentContainerStyle={{ paddingBottom: 80 }}
                keyExtractor={item => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        title={languageConfig.languageConfig}
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]}
                        onRefresh={onRefresh} />
                }
                ListFooterComponent={() => (
                    myLeaveFilterList && myLeaveFilterList.length > 0 ?
                        null :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                )}
            />
            {
                !loading &&
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', bottom: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.ADDLEAVESCREEN)} style={styles.touchStyle}>
                        <Image source={IMAGE.PLUS} style={styles.floatImage} />
                    </TouchableOpacity>
                </View>
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


