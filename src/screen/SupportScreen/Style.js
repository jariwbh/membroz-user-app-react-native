import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    textHeader: {
        fontSize: FONT.FONT_SIZE_24,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.DEFALUTCOLOR,
        marginTop: 5
    },
    textSub: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        marginTop: 15
    },
    btnSupport: {
        backgroundColor: COLOR.BACKGROUNDCOLOR,
        borderRadius: 10,
        width: WIDTH - 50,
        height: 45,
        marginTop: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    btnText: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.DEFALUTCOLOR
    },
    btnSubmitText: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },
    btnSubmit: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 30,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 10
    },
    textSubject: {
        color: COLOR.BLACK,
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
    textSubjectError: {
        color: COLOR.BLACK,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        marginTop: 30,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15
    },
    textDescription: {
        color: COLOR.BLACK,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        marginTop: 15,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    textDescriptionError: {
        color: COLOR.BLACK,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        marginTop: 15,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    msgModalView: {
        height: 250,
        width: WIDTH,
        backgroundColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    transactionView: {
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
        height: 55,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        bottom: 0,
    },
    touchStyle: {
        position: KEY.ABSOLUTE,
        width: 50,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        right: 15,
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        bottom: 10,
        zIndex: 2
    },
    floatImage: {
        resizeMode: KEY.CONTAIN,
        width: 15,
        height: 15,
        tintColor: COLOR.WHITE
    },
});

export default styles;