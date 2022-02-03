import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    forgotButton: {
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        alignItems: KEY.FLEX_START,
        borderColor: COLOR.GRAY_DARK,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        color: COLOR.BLACK
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        color: COLOR.BLACK
    },
    viewRound: {
        height: 90,
        width: 90,
        borderRadius: 60,
        borderColor: COLOR.DEFALUTCOLOR,
        borderWidth: 4,
        marginLeft: 10,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    }
});

export default styles;