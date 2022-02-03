import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    View, Text,
    FlatList,
    StyleSheet,
    TouchableOpacity, RefreshControl
} from 'react-native';
import { supportHistoryService } from '../../services/HelpSupportService/HelpSupportService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const TicketHistoryScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [ticketHistory, setTicketHistory] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        setLoading(true);
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, userID])

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getTicketHistory(userInfo._id);
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getOrderHistory(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET Aannouncement List call to APi fetch data
    const getTicketHistory = async (id) => {
        try {
            const response = await supportHistoryService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setTicketHistory(response.data);
                setLoading(false);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER HISTORY LIST FUNCTION
    const renderTicketHistory = ({ item }) => (
        <View style={styles.cardView}>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: 250, padding: 5, flex: 1 }}>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginTop: 10 }}>{languageConfig.tickettitle}</Text>
                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 0, marginTop: -20 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, flex: 1, width: '35%' }}>{item.docnumber}</Text>
                </View>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginTop: 10 }}>{languageConfig.raisedon}</Text>
                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12, marginTop: -20 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{moment(item.createdAt).format('LL')}</Text>
                </View>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginTop: 10 }}>{languageConfig.closuredate}</Text>
                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12, marginTop: -20 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{moment(item.updatedAt).format('LL')}</Text>
                </View>
                {item.status == "Requested" &&
                    <View style={{ alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{languageConfig.status}</Text>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR }}>{languageConfig.pending}</Text>
                        </View>
                    </View>
                }
                {item.status == "deleted" &&
                    <View style={{ alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{languageConfig.status}</Text>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR }}>{languageConfig.cancel}</Text>
                        </View>
                    </View>
                }
                {item.status == "Fixed" &&
                    <View style={{ alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{languageConfig.status}</Text>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GREEN }}>{languageConfig.approved}</Text>
                        </View>
                    </View>
                }
                {item.status == "Closed" &&
                    <View style={{ alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{languageConfig.status}</Text>
                        <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 35 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR }}>{languageConfig.closed}</Text>
                        </View>
                    </View>
                }

            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(ticketHistory && ticketHistory.length > 0)
                ?
                <FlatList
                    style={{ marginTop: 15 }}
                    data={ticketHistory}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderTicketHistory}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingBottom: 50 }}
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
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                    </View>
                    : <Loader />
            }
        </SafeAreaView>
    );
}

export default TicketHistoryScreen;

const styles = StyleSheet.create({
    book: {
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        marginTop: -25,
        marginBottom: 10,
        borderRadius: 0,
        marginRight: 10,
        width: WIDTH / 3,
        alignItems: KEY.CENTER
    },
    containerView: {
        flexDirection: KEY.COLUMN,
        width: WIDTH,
        marginTop: 15,
        backgroundColor: COLOR.WHITE,
    },
    cardView: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        flexDirection: KEY.ROW,
        justifyContent: KEY.SPACEBETWEEN,
        alignItems: KEY.FLEX_START,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        borderRadius: 10
    }
});

