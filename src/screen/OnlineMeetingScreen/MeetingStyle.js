import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    rectangleView: {
        borderRadius: 15,
        width: WIDTH - 30,
        marginTop: 10,
        borderColor: COLOR.TAUPE_GRAY,
        borderWidth: 1
    },
    timeText: {
        marginLeft: 15,
        color: COLOR.TAUPE_GRAY,
        fontSize: FONT.FONT_SIZE_14,
        marginTop: 5,
        width: 200
    },
    text: {
        marginTop: 5,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        width: 140
    },
    subjectText: {
        marginLeft: 15,
        marginTop: 5,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        textTransform: KEY.CAPITALIZE
    },
    memberNameView: {
        marginTop: 15,
        marginLeft: 15,
        alignItems: KEY.CENTER,
        height: 30,
        width: 80,
        justifyContent: KEY.CENTER,
        backgroundColor: COLOR.DEFAULTLIGHT,
        borderRadius: 5
    },
    memberNameText: {
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14
    },
    timeView: {
        justifyContent: KEY.SPACEBETWEEN,
        flexDirection: KEY.ROW,
        marginRight: 15
    },
    usageText: {
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginTop: 15,
        marginLeft: 15,

    },
    joinMeetingView: {
        marginTop: 15,
        marginLeft: 50,
        alignItems: KEY.CENTER,
        height: 40,
        width: WIDTH - 140,
        justifyContent: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 10
    },
    joinView: {
        alignItems: KEY.CENTER,
        height: 30,
        width: 75,
        justifyContent: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 10
    },
    joinText: {
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },

});
export default styles;