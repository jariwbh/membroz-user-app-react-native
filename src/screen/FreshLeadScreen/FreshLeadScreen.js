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
import style from './Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader/index';
import * as LocalService from '../../services/LocalService/LocalService';
import { FreshLeadService } from '../../services/FreshLeadService/FreshLeadService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;

const FreshLeadScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [freshLeadList, setFreshLeadList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, freshLeadList, userID, refreshing]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getFesHLead(userInfo._id);
    }

    const onRefresh = () => {
        setrefreshing(true);
        getFesHLead(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET FRESH LEAD API THROUGH FETCH DATA
    const getFesHLead = async (userID) => {
        try {
            const response = await FreshLeadService(userID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setFreshLeadList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER FRESHLEAD LIST USING FLATLIST
    const renderFreshLead = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.FOLLOWUPDETAILSCREEN, { item })}>
            <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5 }}>
                <View style={{ justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginLeft: 20 }}>
                    <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                        <Text style={style.textTitle}>{item?.property?.fullname}</Text>
                        <Text style={style.textsub}>{item?.property?.mobile}</Text>
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />

            {freshLeadList && freshLeadList.length > 0 ?
                <View style={style.viewMain}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={freshLeadList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderFreshLead}
                        contentContainerStyle={{ paddingBottom: 20 }}
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
                    />
                </View>
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
export default FreshLeadScreen;