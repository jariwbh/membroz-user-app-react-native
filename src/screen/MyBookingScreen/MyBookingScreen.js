import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View, Image, Text, TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyBookingScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={styles.rectangleView}>
                        <View style={{ alignItems: KEY.FLEX_START, paddingLeft: 15, marginTop: 25, marginRight: 15 }}>
                            <Icon name='check-circle' size={30} />
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginTop: 10, width: 200 }}>
                            <Text style={styles.headerText}>Howars Plaza -</Text>
                            <Text style={styles.headerText}>Agra</Text>
                            <Text style={styles.subHeaderText}>Agra</Text>
                            <Text style={styles.subHeaderText}>08, Sep 2021 to 09, Sep 2021</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginTop: 35, width: 120 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY }}>08, Sep 2021</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.WEB_FOREST_GREEN }}>Confirmed</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.BOOKNOWSCREEN)} style={styles.touchStyle}>
                <Image source={IMAGE.PLUS} style={styles.floatImage} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default MyBookingScreen;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    rectangleView: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 20,
        height: HEIGHT / 5,
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
        fontSize: FONT.FONT_SIZE_16,

    },
    subHeaderText: {
        fontSize: FONT.FONT_SIZE_16
    },
    floatImage: {
        resizeMode: KEY.CONTAIN,
        width: 15,
        height: 15,
        tintColor: COLOR.WHITE

    },
    touchStyle: {
        position: KEY.ABSOLUTE,
        width: 50,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        right: 10,
        bottom: 30,
        top: HEIGHT - 200,
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
    },
});

