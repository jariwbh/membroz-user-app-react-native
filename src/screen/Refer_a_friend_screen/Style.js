import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    btnSupport: {
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 30,
        width: WIDTH - 50,
        height: 45,
        marginTop: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    btnText: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },
    btnSubmit: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 10,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    inputTextStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        marginBottom: 20
    },
    inputTextStyleError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        marginBottom: 20
    },
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
    cardView: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        alignItems: KEY.FLEX_START,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        borderRadius: 10
    }
});

export default styles;