import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

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
        height: 120,
        width: 200
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
        width: '100%',
        height: '100%',
    }
});

export default styles;