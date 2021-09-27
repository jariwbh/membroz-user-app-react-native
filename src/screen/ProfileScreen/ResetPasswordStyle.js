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
    },
    forgotButton: {
        borderRadius: 30,
        //borderWidth: 1,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    inputTextView: {
        borderRadius: 30,
        borderWidth: 2,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
    },
    inputTextViewError: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
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
    },

});

export default styles;