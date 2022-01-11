import { StyleSheet, Dimensions } from 'react-native';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as KEY from '../../context/actions/key';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    imageLogo: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50,
        // marginBottom: 55,
        // height: 100,
        // width: 200,
        marginBottom: 20,
        height: 100,
        width: 120
    },
    welcomeText: {
        fontSize: 40,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        fontFamily: FONT.FONT_FAMILY_SANS_SERIF,
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        marginBottom: 5,
        paddingLeft: 15
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_14,
        marginBottom: 5,
        paddingLeft: 15
    },
    loginBtn: {
        borderRadius: 10,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    backgroundImage: {
        flex: 1,
        height: HEIGHT,
        width: WIDTH,
        justifyContent: KEY.CENTER
    }
});

export default styles;