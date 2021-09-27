import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar, View, Text
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;

const NotificationScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default NotificationScreen;


