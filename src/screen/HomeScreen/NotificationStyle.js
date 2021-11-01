import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
    },
    notificationview: {
        flexDirection: KEY.COLUMN,
        height: 90,
        width: WIDTH - 20,
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        shadowColor: COLOR.BLACK,
        marginBottom: 5
    },
    submitbtn: {
        flexDirection: KEY.ROW,
        marginRight: 15,
        width: 90,
        height: 30,
        backgroundColor: COLOR.BLACK,
        borderRadius: 100,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1
    }
})