import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text, FlatList, TouchableOpacity,
    StatusBar, RefreshControl
} from 'react-native';
import * as IMAGE from '../../styles/image'
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import styles from './styles';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import Loader from '../../components/loader/index';
import moment from 'moment';
import * as LocalService from '../../services/LocalService/LocalService';
import { AannouncementService } from '../../services/NotificationService/NotificationService';
const WIDTH = Dimensions.get('window').width;

const AnnouncementScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [AannouncementList, setAannouncementList] = useState([]);
    const [userID, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [loading, userID, refreshing, AannouncementList]);

    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getUserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setUserID(userInfo._id);
        getAannouncementList(userInfo._id);
    }

    //GET Aannouncement List call to APi fetch data
    const getAannouncementList = async (id) => {
        try {
            const response = await AannouncementService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setAannouncementList(response.data);
                setLoading(false);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getAannouncementList(userID);
        wait(3000).then(() => setrefreshing(false));
    }

    //render Aannouncement list
    const renderAannouncementItem = ({ item }) => (
        <TouchableOpacity
            style={styles.viewSelect}>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 15 }}>
                <Text style={{ fontSize: FONT.FONT_SIZE_18, fontWeight: FONT.FONT_WEIGHT_BOLD, marginTop: 10 }}>{item && item.property.subject}</Text>
                <Text style={{ fontWeight: FONT.FONT_WEIGHT_NORMAL, fontSize: FONT.FONT_SIZE_16, marginBottom: 10, color: COLOR.TAUPE_GRAY }}>{item && moment(item.createdAt).format('LL')}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(AannouncementList && AannouncementList.length > 0)
                ?
                <FlatList
                    style={{ marginTop: 15 }}
                    data={AannouncementList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderAannouncementItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            title="Pull to refresh"
                            tintColor={COLOR.DEFALUTCOLOR}
                            titleColor={COLOR.DEFALUTCOLOR}
                            colors={[COLOR.DEFALUTCOLOR]}
                            onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER, marginTop: 0 }}
                    keyExtractor={item => item._id}
                />
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

export default AnnouncementScreen;


