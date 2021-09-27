import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    holidayView: {
        backgroundColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        width: WIDTH,
        height: 50,
        flexDirection: KEY.ROW
    },
    text: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.KELY_GREEN,
        padding: 15,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },
    view: {
        backgroundColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        width: WIDTH,
        height: 60,
        flexDirection: KEY.ROW,
        shadowColor: COLOR.BLACK,
    },
    btnTab: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        justifyContent: KEY.CENTER,
        height: 60,

    },
    tabText: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.KELY_GREEN,
        padding: 15,
    },
    tabActive: {
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 3
    },
    viewRectangle: {
        borderRightWidth: 5,
        borderLeftColor: COLOR.DEFALUTCOLOR,
        borderRightColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 40,
        height: 65,
        marginTop: 25,
        borderRadius: 8,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flexDirection: KEY.ROW,

    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_16,
        marginTop: 10,
        fontFamily: FONT.FONT_FAMILY_SANS_SERIF_LIGHT,
        fontWeight: FONT.FONT_WEIGHT_NORMAL,
    },
    cardview: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 20,

    },
    innercardview: {
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        width: WIDTH - 30,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 0.5
    },
});
export default styles;