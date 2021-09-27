import {
    StyleSheet, Dimensions
} from 'react-native';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewMain: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    viewRound: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 3,
        backgroundColor: COLOR.WELDON_BLUE,
        marginLeft: 10,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    textName: {
        marginTop: 20,
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        textTransform: KEY.CAPITALIZE
    },
    textSansThin: {
        fontSize: FONT.FONT_SIZE_20,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        textTransform: KEY.CAPITALIZE
    },
    textInfo: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginBottom: 0
    },
    viewRectangle: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: KEY.ROW,
        borderRadius: 6,
        backgroundColor: COLOR.WHITE,
        height: 55,
        width: WIDTH - 30,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: -5,

    },
    msgModalView: {
        height: 200,
        width: WIDTH - 60,
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
        borderRadius: 5
    }
});

export default styles;