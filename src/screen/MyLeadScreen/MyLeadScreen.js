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
import { MyLeadService } from '../../services/FreshLeadService/FreshLeadService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;

const MyLeadScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [myLeadList, setMyLeadList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

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
    }, [loading, myLeadList, userID, refreshing]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getMyLead(userInfo._id);
    }

    const onRefresh = () => {
        setrefreshing(true);
        getMyLead(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET My LEAD API THROUGH FETCH DATA
    const getMyLead = async (userID) => {
        try {
            const response = await MyLeadService(userID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setMyLeadList(response.data);
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
                        <Text style={styles.textsub}>{item.property.mobile}</Text>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {myLeadList && myLeadList.length > 0 ?
                <View style={styles.viewMain}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={myLeadList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderMyLead}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyExtractor={item => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                title={languageConfig.pullrefreshtext}
                                tintColor={COLOR.DEFALUTCOLOR}
                                titleColor={COLOR.DEFALUTCOLOR}
                                colors={[COLOR.DEFALUTCOLOR]}
                                onRefresh={onRefresh} />
                        }
                    />
                    <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 0 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.ADDLEADSCREEN)} style={styles.touchStyle}>
                            <Image source={IMAGE.PLUS} style={styles.floatImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                :
                loading == false ?
                    <>
                        <View activeOpacity={0.7} style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 150 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                        <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 10, position: KEY.ABSOLUTE, right: 10 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.ADDLEADSCREEN)} style={styles.touchStyle}>
                                <Image source={IMAGE.PLUS} style={styles.floatImage} />
                            </TouchableOpacity>
                        </View>
                    </>
                    : <Loader />
            }
        </SafeAreaView>
    );
}
export default MyLeadScreen;

