import React, { useEffect, useState } from 'react';
import {
    Dimensions, SafeAreaView, View,
    Image, Text, RefreshControl,
    TouchableOpacity, FlatList,
    StyleSheet, StatusBar
} from 'react-native';
import { ReferFriendListService } from '../../services/ReferFriendService/ReferaFriendService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import { useFocusEffect } from '@react-navigation/native';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader';
import * as IMAGE from '../../styles/image';
import styles from './Style';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;

const ReferFriendScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [referFrienList, setReferFrienList] = useState([]);
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
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading])

    const onRefresh = () => {
        setrefreshing(true);
        getReferFriend(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    // GET USER DATA LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        getReferFriend(userInfo._id);
        setUserID(userInfo._id);
    }

    //GET FRESH MEETING API THROUGH FETCH DATA
    const getReferFriend = async (userID) => {
        try {
            const response = await ReferFriendListService(userID);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setReferFrienList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER REFER FRIEND LIST USING FLATLIST
    const renderReferFriendList = ({ item }) => (
        <View style={styles.cardView}>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: 250, padding: 5, flex: 1 }}>
                <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE }}>{item.property && item.property.fullname}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{item.property && item.property.mobile}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{item.property && item.property.primaryemail}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>Invitation: </Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{moment(item.createdAt).format('LL')}</Text>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, tintColor: COLOR.DEFALUTCOLOR }} />
            <FlatList
                style={{ marginTop: 10 }}
                data={referFrienList}
                showsVerticalScrollIndicator={false}
                renderItem={renderReferFriendList}
                contentContainerStyle={{ paddingBottom: 80 }}
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
                ListFooterComponent={() => (
                    referFrienList && referFrienList.length > 0 ?
                        null :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                )}
            />
            {!loading &&
                <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.REFERFRIENDREQUEST)} style={styles.touchStyle}>
                        <Image source={IMAGE.PLUS} style={styles.floatImage} />
                    </TouchableOpacity>
                </View>
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default ReferFriendScreen;

