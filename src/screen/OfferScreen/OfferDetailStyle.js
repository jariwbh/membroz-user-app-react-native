import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    ImageView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    containerView: {
        alignItems: KEY.FLEX_START,
        marginTop: 30,
        marginLeft: 20
    },
    headerText: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.TAUPE_GRAY,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
    },
    usageText: {
        fontSize: FONT.FONT_SIZE_20,
        fontFamily: FONT.FONT_FAMILY_SANS_SERIF_THIN,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginTop: 30,
        marginBottom: 10,
        color: COLOR.TAUPE_GRAY
    },
});
export default styles;