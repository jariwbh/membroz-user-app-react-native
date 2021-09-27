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
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        marginTop: 25
    },
    inputTextViewError: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        marginTop: 25
    },
    forgotButton: {
        borderRadius: 30,
        //borderWidth: 1,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 0,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    }
});
export default styles;