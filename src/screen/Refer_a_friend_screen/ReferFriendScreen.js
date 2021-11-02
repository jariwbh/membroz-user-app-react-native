import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar
} from 'react-native';
import * as IMAGE from '../../styles/image'
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ReferFriendScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>

            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.REFERFRIENDREQUEST)} style={styles.touchStyle}>
                <Image source={IMAGE.PLUS} style={styles.floatImage} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default ReferFriendScreen;

const styles = StyleSheet.create({
    touchStyle: {
        position: KEY.ABSOLUTE,
        width: 50,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        right: 10,
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        bottom: 20
    },
    floatImage: {
        resizeMode: KEY.CONTAIN,
        width: 15,
        height: 15,
        tintColor: COLOR.WHITE
    },
});


