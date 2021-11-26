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
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/loader/index';
import * as LocalService from '../../services/LocalService/LocalService';
import { leaveRequestListService, leaveTypeService } from '../../services/LeaveService/LeaveService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { useFocusEffect } from '@react-navigation/native';
import styles from './Style';
import moment from 'moment';
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
        setLoading(true);
        getLeaveType();
        getUserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, myLeaveList, leaveTypeList, selectLeaveType, myLeaveFilterList, userID, refreshing]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
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

    const getLeaveType = async () => {
        try {
            const response = await leaveTypeService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
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
    const renderMyLeave = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
            <View style={styles.boxView}>
                <View
                    style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                    <View style={{ marginLeft: 15, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
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
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: -70 }}>
                        <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD }}>{moment(item.property.fromdate).format('DD MMM, YYYY') + ' - ' + moment(item.property.todate).format('DD MMM, YYYY')}</Text>
                        <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15 }}>{item.leavetype.title}</Text>
                        <Text style={{ fontSize: 12, color: COLOR.BLACK, marginLeft: 15 }}>{'Create at : ' + moment(item.createdAt).format('ll')}</Text>
                    </View>
                    {
                        item.wfstatus && item.wfstatus.toLowerCase() == "approved" &&
                        <Text style={{ fontSize: 14, color: COLOR.WEB_FOREST_GREEN, marginTop: 15, marginRight: 20 }}>{'Approved'}</Text>
                    }
                    {
                        item.wfstatus && item.wfstatus.toLowerCase() == "pending" &&
                        <Text style={{ fontSize: 14, color: COLOR.YELLOW, marginTop: 15, marginRight: 20 }}>{'Pending '}</Text>
                    }
                    {
                        item.wfstatus && item.wfstatus.toLowerCase() == "declined" &&
                        <Text style={{ fontSize: 14, color: COLOR.ERRORCOLOR, marginTop: 15, marginRight: 20 }}>{'Declined'}</Text>
                    }
                </View>
            </View>
        </View>
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
                        title="Pull to refresh"
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]}
                        onRefresh={onRefresh} />
                }
                ListFooterComponent={() => (
                    myLeaveFilterList && myLeaveFilterList.length > 0 ?
                        null :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 150 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
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


