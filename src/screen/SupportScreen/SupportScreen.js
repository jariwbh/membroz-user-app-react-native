import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import * as LocalService from '../../services/LocalService/LocalService';
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
        getuserDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [supportMobile, supportEmail])


    //GET USER DATA IN MOBILE LOCAL STORAGE
    const getuserDeatilsLocalStorage = async () => {
        var userInfo = await LocalService.LocalStorageService();
        setSupportMobile(userInfo.branchid.supportemail);
        setSupportEmail(userInfo.branchid.companyphone);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={styles.containView}>
                <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
                <Text style={styles.textHeader}>We are here to help you</Text>
                <Text style={styles.textSub}>Contact Us</Text>
                <View style={{ marginTop: 10, justifyContent: KEY.CE, alignItems: 'center' }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Call us - {supportMobile}</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Mail us - {supportEmail}</Text>
                </View>
                <TouchableOpacity style={styles.btnSupport} onPress={() => props.navigation.navigate(SCREEN.SUPPORTTICKETSCREEN)} >
                    <Text style={styles.btnText}>Support Ticket</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default SupportScreen;




