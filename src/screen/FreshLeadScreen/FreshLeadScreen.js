import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View, FlatList, RefreshControl, TextInput,
    StatusBar, TouchableOpacity, Pressable
} from 'react-native';
import { FreshLeadService } from '../../services/FreshLeadService/FreshLeadService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { filterService } from '../../services/LookupService/LookupService';
import * as LocalService from '../../services/LocalService/LocalService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import style from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const FreshLeadScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [freshLeadList, setFreshLeadList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [SearchFreshLead, setSearchFreshLead] = useState([]);
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
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, freshLeadList, userID, refreshing, SearchFreshLead, filterList, selectFilter]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getManagefilter(userInfo._id, selectFilter);
    }

    const onRefresh = () => {
        setrefreshing(true);
        getFesHLead(userID, selectFilter);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET FRESH LEAD API THROUGH FETCH DATA
    const getFesHLead = async (userID, filtername) => {
        try {
            const response = await FreshLeadService(userID, filtername);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setFreshLeadList(response.data);
                setSearchFreshLead(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //local search Filter Function
    const searchFilterFunction = (text) => {
        const newData = freshLeadList.filter(item => {
            const itemData = `${item.property.fullname.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return setSearchFreshLead(newData);
    };

    //RENDER FRESHLEAD LIST USING FLATLIST
    const renderFreshLead = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.FOLLOWUPDETAILSCREEN, { item })}>
            <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
                <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                    <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                        <Text style={style.textTitle}>{item?.property?.fullname}</Text>
                        {
                            item?.property && item?.property?.mobile &&
                            <Text style={style.textsub}>{item.property.mobile}</Text>
                        }
                        {
                            item?.property && item?.property?.interest &&
                            <Text style={style.textsub}>{(languageConfig.interesttext) + (item?.property && item?.property?.interest && " : " + item?.property?.interest)}</Text>
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
                getFesHLead(userID, undefined);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER CATAGORY LIST
    const renderFilterItem = ({ item, index }) => (
        item.selected == true ?
            <TouchableOpacity style={style.activeTabStyle}
                onPress={() => onPressFilterListItem(item, index)}>
                <Text style={style.activeTextStyle}>
                    {item.name}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={style.deactiveTabStyle}
                onPress={() => onPressFilterListItem(item, index)}>
                <Text style={style.deactiveTextStyle}>
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
                getFesHLead(userID, undefined);
            } else {
                getFesHLead(userID, item.name);
            }

        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <View style={style.centerView}>
                    <View style={style.statusbar}>
                        <TextInput
                            placeholder={languageConfig.search}
                            placeholderTextColor={COLOR.GRAY_MEDIUM}
                            selectionColor={COLOR.DEFALUTCOLOR}
                            returnKeyType={KEY.DONE}
                            autoCapitalize="none"
                            style={style.inputTextView}
                            autoCorrect={false}
                            onChangeText={(value) => searchFilterFunction(value)}
                        />
                        <AntDesign name='search1' size={23} color={COLOR.BLACK} style={{ padding: 10 }} />
                    </View>
                </View>
                <View style={style.viewMain}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={SearchFreshLead}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderFreshLead}
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
                        ListFooterComponent={() => (
                            SearchFreshLead && SearchFreshLead.length == 0 &&
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: HEIGHT * 0.1 }}>
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

export default FreshLeadScreen;