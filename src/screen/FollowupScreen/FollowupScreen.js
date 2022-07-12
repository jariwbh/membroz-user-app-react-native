import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text, TextInput,
    View, FlatList, RefreshControl,
    StatusBar, TouchableOpacity, Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { followUpService } from '../../services/FollowUpService/FollowUpService';
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
    }, [loading, followUpList, userID, refreshing, SearchfollowUp, selectFilter]);

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
            const response = await followUpService(userID, filtername);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setFollowUpList(response.data);
                setSearchfollowUp(response.data);
                setLoading(false);
            }
        } catch (error) {
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
    const searchFilterFunction = (text) => {
        const newData = followUpList.filter(item => {
            const itemData = `${item?.customerid?.property?.fullname.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return setSearchfollowUp(newData);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        style={{ paddingBottom: 10 }}
                        showsHorizontalScrollIndicator={false}
                        numColumns={filterList && filterList.length}
                        key={filterList && filterList.length}
                        data={filterList}
                        renderItem={renderFilterItem}
                        keyExtractor={item => item.name}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                    />
                </ScrollView>
                <View style={styles.centerView}>
                    <View style={styles.statusbar}>
                        <TextInput
                            placeholder={KEY.SEARCH}
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
                <View style={styles.viewMain}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={SearchfollowUp}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderFollowUp}
                        contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
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
                        ListFooterComponent={() => (
                            SearchfollowUp && SearchfollowUp.length == 0 &&
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: HEIGHT * 0.2 }}>
                                <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default FollowupScreen;

