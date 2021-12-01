import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

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
    cardView: {
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        borderRightWidth: 10,
        borderRightColor: COLOR.DEFALUTCOLOR,
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    filledBox: {
        width: 100,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        flexDirection: KEY.COLUMN,
        padding: 5
    },
    statusView: {
        flexDirection: KEY.ROW,
    },
    textView: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK
    },
    rectangleText: {
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        marginTop: 5,
    },
    rectangleSubText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        marginTop: 5,
    }
});
export default styles;