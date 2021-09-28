import {
    StyleSheet, Dimensions
} from 'react-native';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 50
    },
    viweRound: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 3,
        backgroundColor: COLOR.WELDON_BLUE,
        marginLeft: 10,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginBottom: 5
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    addressView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 30,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    updateBtn: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
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