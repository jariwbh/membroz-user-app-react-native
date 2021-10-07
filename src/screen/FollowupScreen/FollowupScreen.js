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
import { followUpService } from '../../services/FollowUpService/FollowUpService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader/index';
import * as LocalService from '../../services/LocalService/LocalService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { useFocusEffect } from '@react-navigation/native';
import styles from './Style';
const WIDTH = Dimensions.get('window').width;

const FollowupScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [followUpList, setFollowUpList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getUserDeatilsLocalStorage();
        }, [])
    );

    useEffect(() => {
    }, [loading, followUpList, userID, refreshing]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getFollowUpList(userInfo._id);
    }

    //GET PULL TO REFRSH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        setFollowUpList(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET My LEAD API THROUGH FETCH DATA
    const getFollowUpList = async (userID) => {
        try {
            const response = await followUpService(userID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setFollowUpList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER FOLLOW UP LIST USING FLATLIST
    const renderFollowUp = ({ item }) => (
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
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {followUpList && followUpList.length > 0 ?
                    <View style={styles.viewMain}>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={followUpList}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderFollowUp}
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
                        <>
                            <View activeOpacity={0.7} style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 150 }} resizeMode={KEY.CONTAIN} />
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                            </View>
                        </>
                        : <Loader />
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default FollowupScreen;

