import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text, TextInput,
    View, FlatList, RefreshControl,
    StatusBar, TouchableOpacity, ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { followUpService, SearchFollowUpService } from '../../services/FollowUpService/FollowUpService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { filterService } from '../../services/LookupService/LookupService';
import * as LocalService from '../../services/LocalService/LocalService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import { useFocusEffect } from '@react-navigation/native';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment-timezone';
//import moment from 'moment';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const FollowupScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [followUpList, setFollowUpList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [SearchfollowUp, setSearchfollowUp] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [selectFilter, setSelectFilter] = useState(undefined);
    const [loadingMore, setLoadingMore] = useState(false);
    const [defaultPageNo, setdefaultPageNo] = useState(1);
    const [searchText, setsearchText] = useState('');
    let defaultSize = 10;
    let stopFetchMore = true;

    useFocusEffect(
        React.useCallback(() => {
            getUserDeatilsLocalStorage();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setLoading(true);
    }, []);

    useEffect(() => {
    }, [loading, followUpList, userID, refreshing, SearchfollowUp,
        selectFilter, defaultPageNo, searchText]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        moment.tz.setDefault(userInfo?.branchid?.timezone);
        setUserID(userInfo._id);
        getManagefilter(userInfo._id);
    }

    //GET PULL TO REFRSH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getManagefilter(userID, selectFilter);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET My LEAD API THROUGH FETCH DATA
    const getFollowUpList = async (userID, filtername) => {
        try {
            const response = await followUpService(userID, filtername, defaultPageNo, defaultSize);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setFollowUpList(response.data);
                setSearchfollowUp(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    const renderFollowUpDeatils = (val) => {
        let item = {
            _id: val?.customerid?._id,
            property: {
                mobile: val?.customerid?.property?.mobile,
                fullname: val?.customerid?.property?.fullname,
                primaryemail: val?.customerid?.property?.primaryemail,
            },
            createdAt: val.duedate
        }
        props.navigation.navigate(SCREEN.FOLLOWUPDETAILSCREEN, { item });
    }

    //RENDER FOLLOW UP LIST USING FLATLIST
    const renderFollowUp = ({ item, index }) => (
        <>
            <TouchableOpacity onPress={() => renderFollowUpDeatils(item)}>
                <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 10 }}>
                    <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                        <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                            <Text numberOfLines={1} style={styles.textTitle}>{item?.customerid?.property?.fullname}</Text>
                            <Text style={styles.textTitle}>{item?.customerid?.property?.mobile}</Text>
                            <Text style={styles.textsub}>{item.type}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => renderFollowUpDeatils(item)}
                        style={{ justifyContent: KEY.FLEX_END, marginRight: 20 }}>
                        <AntDesign name='right' size={20} style={{ color: COLOR.GRAY_DARK, alignItems: KEY.FLEX_START, marginTop: 8 }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: COLOR.GRAY_MEDIUM, borderBottomWidth: 1, marginTop: 10, marginRight: 15, marginLeft: 15 }} />
        </>
    )

    //local search Filter Function
    const searchFilterFunction = async (text) => {
        if (text != null && text != undefined) {
            let pageno = 1, pagesize = 10;
            //setsearchText(text);
            setSearchfollowUp([]);
            setLoadingMore(true);
            const response = await SearchFollowUpService(userID, selectFilter, pageno, pagesize, text)
            if (response.data != null && response.data != undefined && response.status == 200) {
                setSearchfollowUp(response.data);
                setLoadingMore(false);
                setdefaultPageNo(1);
            }
        } else {
            setdefaultPageNo(1);
            setFollowUpList([]);
            setSearchfollowUp([]);
        }
    };

    //filter data manage
    const getManagefilter = async (userID, filterVaule) => {
        try {
            const response = await filterService();
            if (response.data != null && response.data != undefined && response.status == 200 && response.data[0].data.length > 0) {
                if (filterVaule) {
                    if (filterVaule === languageConfig.allsmalltext) {
                        getFollowUpList(userID, undefined);
                    } else {
                        getFollowUpList(userID, filterVaule);
                    }
                } else {
                    let allOption = { selected: true, name: languageConfig.allsmalltext, code: languageConfig.allsmalltext };
                    let tempArry = [allOption, ...response.data[0].data];
                    setFilterList(tempArry);
                    getFollowUpList(userID, undefined);
                }
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER CATAGORY LIST
    const renderFilterItem = ({ item, index }) => (
        item.selected == true ?
            <TouchableOpacity style={styles.activeTabStyle}
                onPress={() => onPressFilterListItem(item, index)}>
                <Text style={styles.activeTextStyle}>
                    {item.name}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.deactiveTabStyle}
                onPress={() => onPressFilterListItem(item, index)}>
                <Text style={styles.deactiveTextStyle}>
                    {item.name}</Text>
            </TouchableOpacity>
    )

    //THIS FUNCTION ONPRESS CATEGORY LIST ITEM
    const onPressFilterListItem = (item, index) => {
        try {
            setLoading(true);
            const filterItem = filterList.map((item, index) => {
                item.selected = false;
                return item;
            });
            filterItem[index].selected = true;
            setSelectFilter(item.name);
            setFilterList(filterItem);
            getManagefilter(userID, item.name);
        } catch (error) {
            setLoading(false);
        }
    }

    const ListFooterComponent = () => (
        <ActivityIndicator
            size={KEY.LARGE}
            color={COLOR.DEFALUTCOLOR}
            style={{
                justifyContent: KEY.CENTER,
                alignItems: KEY.CENTER,
            }}
        />
    );

    const handleOnEndReached = async () => {
        setLoadingMore(true);
        if (!stopFetchMore) {
            let no = Number(defaultPageNo) + 1;
            setdefaultPageNo(no);
            const response = await followUpService(userID, selectFilter, no, defaultSize);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setFollowUpList([...followUpList, ...response.data]);
                setSearchfollowUp([...SearchfollowUp, ...response.data]);
                stopFetchMore = true;
            } else {
                return setLoadingMore(false);
            }
        }
        setLoadingMore(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        contentContainerStyle={{ marginBottom: 10 }}
                        showsHorizontalScrollIndicator={false}
                        numColumns={filterList && filterList.length}
                        key={filterList && filterList.length}
                        data={filterList}
                        renderItem={renderFilterItem}
                        keyExtractor={item => item.name}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                    />
                </ScrollView>
                <View style={styles.statusbar}>
                    <TextInput
                        placeholder={KEY.SEARCH}
                        placeholderTextColor={COLOR.GRAY_MEDIUM}
                        selectionColor={COLOR.DEFALUTCOLOR}
                        returnKeyType={KEY.DONE}
                        autoCapitalize="none"
                        style={styles.inputTextView}
                        autoCorrect={false}
                        onChangeText={(value) => setsearchText(value)}
                        onSubmitEditing={() => searchFilterFunction(searchText)}
                    />
                    <TouchableOpacity onPress={() => searchFilterFunction(searchText)}>
                        <AntDesign name='search1' size={23} color={COLOR.BLACK} style={{ padding: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                style={{ marginTop: 5 }}
                data={SearchfollowUp}
                showsVerticalScrollIndicator={false}
                renderItem={renderFollowUp}
                contentContainerStyle={{ marginTop: 10, paddingBottom: 40 }}
                keyExtractor={item => item._id}
                keyboardShouldPersistTaps={KEY.ALWAYS}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        title={languageConfig.pullrefreshtext}
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]}
                        onRefresh={onRefresh} />
                }
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.5}
                onScrollBeginDrag={() => {
                    stopFetchMore = false;
                }}
                ListFooterComponent={() => (
                    loadingMore && <ListFooterComponent />
                )}
                ListEmptyComponent={
                    followUpList && followUpList.length === 0 &&
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                    </View>
                }
            />
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default FollowupScreen;

