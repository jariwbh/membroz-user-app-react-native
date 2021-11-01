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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        setSupportMobile(userInfo.branchid.companyphone);
        setSupportEmail(userInfo.branchid.supportemail);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
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
            <TouchableOpacity style={styles.transactionView} onPress={() => props.navigation.navigate(SCREEN.TICKETHISTORYSCREEN)}>
                <View style={{ flexDirection: KEY.ROW }}>
                    <Icon name='wallet' size={45}
                        style={{
                            color: COLOR.TAUPE_GRAY,
                            marginRight: 10,
                            marginTop: 20,
                            marginLeft: 15,

                        }} />
                    <View style={{ flexDirection: KEY.COLUMN, width: 190 }}>
                        <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.GREY, fontSize: FONT.FONT_SIZE_20, marginLeft: 10, marginTop: 10 }}>Ticket history</Text>
                        <Text style={{ color: COLOR.TAUPE_GRAY, fontSize: FONT.FONT_SIZE_16, marginLeft: 10 }}>View your support ticket history</Text>
                    </View>
                    <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 10, marginTop: 20 }}>
                        <Icon name='chevron-right' size={40} color={COLOR.TAUPE_GRAY} />
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default SupportScreen;




