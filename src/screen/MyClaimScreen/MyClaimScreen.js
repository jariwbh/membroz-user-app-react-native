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
import { advanceClaimListService } from '../../services/AdvanceClaimService/AdvanceClaimService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import languageConfig from '../../languages/languageConfig';
import { useFocusEffect } from '@react-navigation/native';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;

export default LeaveScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [myClaimList, setMyClaimList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState(null);

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
    }, []);

    useEffect(() => {
    }, [loading, myClaimList, userID, refreshing, currencySymbol]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        const response = getCurrency(userInfo.branchid.currency);
        setCurrencySymbol(response);
        setUserID(userInfo._id);
        getMyClaim();
    }

    const onRefresh = () => {
        setrefreshing(true);
        getMyClaim();
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MY LEAVE API THROUGH FETCH DATA
    const getMyClaim = async () => {
        try {
            const response = await advanceClaimListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setLoading(false);
                    setMyClaimList(response.data);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER MYLEAVE LIST USING FLATLIST
    const renderMyClaim = ({ item }) => (
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 5 }}>
            <View style={styles.boxView}>
                <View style={{ flexDirection: KEY.COLUMN, marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: COLOR.BLACK, marginLeft: 15, fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE }}>{item?.property?.title}</Text>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, marginTop: 2 }}>{languageConfig.claimtype + ' : ' + item?.property?.claimtype}</Text>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, marginTop: 2 }}>{languageConfig.amounttext + ' : ' + currencySymbol + item?.property?.amount}</Text>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK, marginLeft: 15, marginTop: 2 }}>{languageConfig.notetext + ' : ' + item?.property?.notes}</Text>
                    <Text style={{ fontSize: 12, color: COLOR.BLACK, marginLeft: 15, marginTop: 2 }}>{languageConfig.createat + ' : ' + moment(item.createdAt).format('ll')}</Text>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{ marginTop: 10 }} />
            <FlatList
                data={myClaimList}
                showsVerticalScrollIndicator={false}
                renderItem={renderMyClaim}
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
                    myClaimList && myClaimList.length > 0 ?
                        null :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 150 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                )}
            />
            {
                !loading &&
                <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.ADDCLAIMSCREEN)} style={styles.touchStyle}>
                        <Image source={IMAGE.PLUS} style={styles.floatImage} />
                    </TouchableOpacity>
                </View>
            }
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


