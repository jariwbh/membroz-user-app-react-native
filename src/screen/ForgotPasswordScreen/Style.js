import { StyleSheet, Dimensions } from 'react-native';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        marginTop: 25
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        marginTop: 25
    },
    forgotButton: {
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 0,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    }
});
export default styles;