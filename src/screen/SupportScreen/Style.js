import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
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
        marginTop: 30,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 10
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
    textSubjectError: {
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
        height: 150,
        width: WIDTH,
        borderRadius: 0,
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
        justifyContent: KEY.CENTER,
        alignContent: KEY.CENTER
    },
});

export default styles;