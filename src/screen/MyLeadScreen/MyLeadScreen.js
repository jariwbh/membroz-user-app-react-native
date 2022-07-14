import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text, TextInput,
    View, FlatList, RefreshControl, ActivityIndicator,
    StatusBar, TouchableOpacity, Pressable
} from 'react-native';
import { MyLeadService, SearchMyLeadService } from '../../services/FreshLeadService/FreshLeadService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { filterService } from '../../services/LookupService/LookupService';
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MyLeadScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [myLeadList, setMyLeadList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [SearchFreshLead, setSearchFreshLead] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [selectFilter, setSelectFilter] = useState(undefined);
    const [loadingMore, setLoadingMore] = useState(false);
    const [defaultPageNo, setdefaultPageNo] = useState(1);
    const [searchText, setsearchText] = useState('');
    let defaultSize = 10;
    let stopFetchMore = true;

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getUserDeatilsLocalStorage();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
    }, [])

    useEffect(() => {
    }, [loading, myLeadList, userID, refreshing, SearchFreshLead,
        filterList, selectFilter, defaultPageNo, loadingMore, searchText]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getManagefilter(userInfo._id, selectFilter);
    }

    const onRefresh = () => {
        setrefreshing(true);
        getMyLead(userID, selectFilter);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //local search Filter Function
    const searchFilterFunction = async (text) => {
        if (text != null && text != undefined) {
            let pageno = 1, pagesize = 10;
            setsearchText(text);
            setLoadingMore(true);
            const response = await SearchMyLeadService(userID, selectFilter, pageno, pagesize, text)
            if (response.data != null && response.data != undefined && response.status == 200) {
                setSearchFreshLead(response.data);
                setLoadingMore(false);
                setdefaultPageNo(1);
            }
        } else {
            setdefaultPageNo(1);
            setMyLeadList([]);
            setSearchFreshLead([]);
        }
    };

    //GET My LEAD API THROUGH FETCH DATA
    const getMyLead = async (userID, filtername) => {
        try {
            const response = await MyLeadService(userID, filtername, defaultPageNo, defaultSize);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setMyLeadList(response.data);
                setSearchFreshLead(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER MYLEAD LIST USING FLATLIST
    const renderMyLead = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.FOLLOWUPDETAILSCREEN, { item })}>
            <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
                <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                    <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                        <Text style={styles.textTitle}>{item.property.fullname}</Text>
                        {
                            item?.property && item?.property?.mobile &&
                            <Text style={styles.textsub}>{item.property.mobile}</Text>
                        }
                        {
                            item?.property && item?.property?.interest &&
                            <Text style={styles.textsub}>{(languageConfig.interesttext) + (item?.property && item?.property?.interest && " : " + item?.property?.interest)}</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.FOLLOWUPDETAILSCREEN, { item })}
                    style={{ justifyContent: KEY.FLEX_END, marginRight: 20 }}>
                    <Ionicons name='call-outline' size={40} style={{ color: COLOR.WEB_FOREST_GREEN, alignItems: KEY.FLEX_START, marginTop: 8 }} />
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: COLOR.GRAY_MEDIUM, borderBottomWidth: 1, marginTop: 10, marginRight: 15, marginLeft: 15 }} />
        </Pressable>
    )

    //filter data manage
    const getManagefilter = async (userID) => {
        try {
            const response = await filterService();
            if (response.data != null && response.data != undefined && response.status == 200 && response.data[0].data.length > 0) {
                let allOption = { selected: true, name: languageConfig.allsmalltext, code: languageConfig.allsmalltext };
                let tempArry = [allOption, ...response.data[0].data];
                setFilterList(tempArry);
                getMyLead(userID, undefined);
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
            if (item.name === languageConfig.allsmalltext) {
                getMyLead(userID, undefined);
            } else {
                getMyLead(userID, item.name);
            }

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
            const response = await MyLeadService(userID, selectFilter, no, defaultSize);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setMyLeadList([...myLeadList, ...response.data]);
                setSearchFreshLead([...SearchFreshLead, ...response.data]);
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
                        style={{ marginBottom: 10 }}
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
                        placeholder={languageConfig.search}
                        placeholderTextColor={COLOR.GRAY_MEDIUM}
                        selectionColor={COLOR.DEFALUTCOLOR}
                        returnKeyType={KEY.DONE}
                        autoCapitalize="none"
                        style={styles.inputTextView}
                        autoCorrect={false}
                        onChangeText={(value) => searchFilterFunction(value)}
                    />
                    <AntDesign name='search1' size={23} color={COLOR.BLACK} style={{ padding: 10 }} />
                </View>
            </View>
            <FlatList
                style={{ marginTop: 5 }}
                data={SearchFreshLead}
                showsVerticalScrollIndicator={false}
                renderItem={renderMyLead}
                contentContainerStyle={{ paddingBottom: 20 }}
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
                ListEmptyComponent={() => (
                    myLeadList && myLeadList.length == 0 &&
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                    </View>
                )}
            />
            <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 0 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.ADDLEADSCREEN)} style={styles.touchStyle}>
                    <Image source={IMAGE.PLUS} style={styles.floatImage} />
                </TouchableOpacity>
            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
export default MyLeadScreen;

