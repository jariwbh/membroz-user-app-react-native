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
    headerText: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.DEFALUTCOLOR,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginTop: 10,
        marginBottom: 10
    },
    viewRectangle: {
        borderRightWidth: 5,
        borderLeftColor: COLOR.DEFALUTCOLOR,
        borderRightColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 40,
        height: 65,
        marginTop: 10,
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
    viewSquare: {
        width: 70,
        flexDirection: KEY.COLUMN,
        borderRadius: 8,
        backgroundColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_18,
        marginTop: 10,
        fontFamily: FONT.FONT_FAMILY_SANS_SERIF_LIGHT,
        fontWeight: FONT.FONT_WEIGHT_NORMAL,
        color: COLOR.DEFALUTCOLOR
    },
});
export default styles;