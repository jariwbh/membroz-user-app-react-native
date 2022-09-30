import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TextInput, Modal, RefreshControl,
    ScrollView, FlatList,
    TouchableOpacity,
    StatusBar, Image, Linking, Platform, Alert
} from 'react-native';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import { AUTHUSER } from '../../context/actions/type';
import styles from './ChatScreenHistorystyle';
import AsyncStorage from '@react-native-community/async-storage';
import axiosConfig from '../../helpers/axiosConfig';
import { useFocusEffect } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/crashlytics';
import * as FONT from '../../styles/typography';
import { RecentChatService } from "../../services/ChatService/ChatService";
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ChatScreenHistory = (props, item) => {

    const [loading, setloading] = useState(false);
    const [recentChat, setrecentChat] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [currentUserId, setcurrentUserId] = useState(null);
    const [SearchConsultant, setSearchConsultant] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem(AUTHUSER).then((res) => {
                let currentUser = JSON.parse(res)._id;
                axiosConfig(currentUser);
                setcurrentUserId(currentUser);
                recentchatlist(currentUser);
            });
        }, [])
    );

    useEffect(() => {
        setloading(true);
    }, [])

    useEffect(() => {
    }, [currentUserId, recentChat, refreshing])

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        let id = currentUserId;
        setrefreshing(true);
        recentchatlist(id);
        wait(3000).then(() => setrefreshing(false));
    }

    const recentchatlist = async (id) => {
        try {
            const response = await RecentChatService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setrecentChat(response.data);
                setSearchConsultant(response.data);
                setloading(false);
            }
        }
        catch (error) {
            setloading(false);
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
        }
    }

    const navigationhandler = (item) => {
        if (item) {
            const memberDetails = {
                _id: item.property && item.property.memberid ? item.property.memberid : null,
                profilepic: item.property && item.property.memberprofilepic ? item.property.memberprofilepic : null,
                fullname: item.property.membername
            }
            props.navigation.navigate(SCREEN.CHATSCREEN, { memberDetails });
        }
    }

    const renderChatUser = ({ item }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.maincard} onPress={() => navigationhandler(item)}>
                <View style={{ marginTop: 10, marginBottom: 10, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, width: WIDTH - 30 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item && item.property && item.property.memberprofilepic ? item.property.memberprofilepic : noProfile }}
                            style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 20, borderColor: '#555555', borderWidth: 0.2 }} />
                    </View>
                    <View style={{ marginRight: 60 }}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_18, fontWeight: 'bold', color: "#000000", textTransform: 'capitalize', width: WIDTH / 2, textAlign: KEY.CENTER }}>
                                {item && item.property && item.property.membername && item.property.membername}</Text>
                        </View>
                    </View>
                    <View></View>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <FlatList
                    data={recentChat}
                    renderItem={renderChatUser}
                    contentContainerStyle={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}
                    keyExtractor={item => item._id}
                    ListFooterComponent={() => (
                        recentChat && recentChat.length > 0 ?
                            <></>
                            :
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 50 }} resizeMode={KEY.CONTAIN} />
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                            </View>
                    )}
                />
            </ScrollView>
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.MYTEAMSCREEN)} style={styles.touchStyle}>
                <Image source={IMAGE.PLUS} style={styles.floatImage} />
            </TouchableOpacity>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}


export default ChatScreenHistory;