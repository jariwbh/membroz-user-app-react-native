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
        borderRightColor: COLOR.DEFALUTCOLOR,
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
    },
    centerView: {
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    statusbar: {
        flexDirection: KEY.ROW,
        alignItems: KEY.CENTER,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GRANITE_GRAY,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 40,
        height: 45,
        color: COLOR.BLACK_OLIVE,
        marginBottom: 10,
        paddingLeft: 15,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        fontSize: FONT.FONT_SIZE_14,
        flex: 1
    }
});

export default styles;