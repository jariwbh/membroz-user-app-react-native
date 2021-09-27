import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 70
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
        marginTop: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    textSubject: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15
    },
    textDescription: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        marginTop: 10,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,

    },
});

export default styles;