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
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MembershipOffers = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />

            <View style={styles.containerView}>
                <View style={styles.rectangleView}>
                    <Text style={styles.headerText}>Signature 10 Years*</Text>
                    <View style={{ flexDirection: KEY.COLUMN, marginTop: 20, width: 120, alignItems: KEY.FLEX_END, marginLeft: 50 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY }}>Qty</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY }}>0</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default MembershipOffers;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    rectangleView: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 20,
        height: HEIGHT / 8,
        borderRadius: 5,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection: KEY.ROW
    },
    headerText: {
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        fontSize: FONT.FONT_SIZE_18,
        marginLeft: 15,
        marginTop: 20
    },

});


