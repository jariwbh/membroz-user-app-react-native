import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  squreView: {
    //height: 100,
    flex: 1,
    width: WIDTH - 20,
    backgroundColor: COLOR.WHITE,
    borderRadius: 5,
    justifyContent: KEY.SPACEBETWEEN
  },
  textTitle: {
    marginTop: 5,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    width: WIDTH - 150
  },
  textsub: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.MENU_TEXT_COLOR,
    fontSize: FONT.FONT_SIZE_16
  },
  viewMain: {
    flex: 1,
    //height: HEIGHT - 220,
    backgroundColor: COLOR.WHITE,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centerView: {
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER
  },
  statusbar: {
    flexDirection: KEY.ROW,
    alignItems: KEY.CENTER,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.GRANITE_GRAY,
    alignItems: KEY.FLEX_START,
    width: WIDTH - 40,
    height: 45,
    color: COLOR.BLACK_OLIVE,
    marginBottom: 5,
    paddingLeft: 15
  },
  inputTextView: {
    fontSize: FONT.FONT_SIZE_14,
    flex: 1
  },
  deactiveTabStyle: {
    height: 25,
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: COLOR.WHITE,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    margin: 10
  },
  activeTabStyle: {
    height: 25,
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: COLOR.DEFALUTCOLOR,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    margin: 10
  },
  deactiveTextStyle: {
    fontSize: FONT.FONT_SIZE_14,
    fontWeight: FONT.FONT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.BLACK,
    marginLeft: 15,
    marginRight: 15
  },
  activeTextStyle: {
    fontSize: FONT.FONT_SIZE_14,
    fontWeight: FONT.FONT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.WHITE,
    marginLeft: 15,
    marginRight: 15
  }
});

export default styles;