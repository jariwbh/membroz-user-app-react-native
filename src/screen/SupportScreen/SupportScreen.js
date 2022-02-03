import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StatusBar, ScrollView
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;

const SupportScreen = (props) => {
    const [supportMobile, setSupportMobile] = useState(null);
    const [supportEmail, setSupportEmail] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        getuserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [supportMobile, supportEmail])


    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getuserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setSupportMobile(userInfo.branchid.companyphone);
        setSupportEmail(userInfo.branchid.supportemail);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={styles.containView}>
                <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
                <Text style={styles.textHeader}>{languageConfig.supportheader}</Text>
                <Text style={styles.textSub}>{languageConfig.contactustext}</Text>
                <View style={{ marginTop: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.callustext} - {supportMobile}</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.mailustext} - {supportEmail}</Text>
                </View>
            </View>

            <TouchableOpacity style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.CENTER, marginTop: 20 }}
                onPress={() => props.navigation.navigate(SCREEN.TICKETHISTORYSCREEN)} >
                <Text style={styles.btnText}>{languageConfig.showtickethistory}</Text>
                <MaterialCommunityIcons name='chevron-right' size={30} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 5 }} />
            </TouchableOpacity>

            <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, bottom: 10, position: KEY.ABSOLUTE, right: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.SUPPORTTICKETSCREEN)} style={styles.touchStyle}>
                    <Image source={IMAGE.PLUS} style={styles.floatImage} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SupportScreen;




