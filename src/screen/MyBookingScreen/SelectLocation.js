import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    StatusBar
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';

const SelectLocation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Location</Text>
                        <TextInput onTouchStart={() => props.navigation.navigate(SCREEN.SELECTLOCATION)} placeholder='Select Location' style={styles.textSubject} />
                        <TouchableOpacity>
                            <Image source={IMAGE.SEARCH} resizeMode={KEY.CONTAIN} style={{ height: 40, width: 25, tintColor: COLOR.TAUPE_GRAY, marginLeft: WIDTH - 80, marginTop: -40 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.btnSubmit} onPress={() => props.navigation.replace(SCREEN.BOOKNOWSCREEN)} >
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default SelectLocation;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 10
    },
    textSubject: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        marginTop: 30,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15
    },
    btnSubmit: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        position: KEY.ABSOLUTE,
        bottom: 60,
        right: 20,
        left: 20
    },
    btnText: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },
});

