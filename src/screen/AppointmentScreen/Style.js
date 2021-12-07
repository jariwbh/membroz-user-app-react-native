import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = (colorcode) => StyleSheet.create({
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
        borderRightColor: colorcode,
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
        backgroundColor: colorcode,
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
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        marginTop: 2,
        width: WIDTH / 2
    },
    rectangleSubText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        marginTop: 2,
        width: WIDTH / 2
    },
    msgModalView: {
        width: WIDTH - 0,
        borderRadius: 0,
        backgroundColor: COLOR.WHITE,
        alignItems: KEY.FLEX_STAR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
        borderRadius: 5
    },
    viewRound: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 3,
        backgroundColor: COLOR.WELDON_BLUE,
        marginLeft: 5,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 10
    },
    meetingBtn: {
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: 100,
        height: 40,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 10
    },
    centerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    }
});
export default styles;