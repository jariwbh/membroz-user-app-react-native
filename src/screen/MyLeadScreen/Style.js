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
  touchStyle: {
    position: KEY.ABSOLUTE,
    width: 50,
    height: 50,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    right: 15,
    borderRadius: 100,
    backgroundColor: COLOR.DEFALUTCOLOR,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    bottom: 20
  },
  floatImage: {
    resizeMode: KEY.CONTAIN,
    width: 15,
    height: 15,
    tintColor: COLOR.WHITE
  },
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
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
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
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15,
  },
  addressView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.BLACK,
    alignItems: KEY.FLEX_START,
    marginBottom: 10,
    width: WIDTH - 30,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
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
    marginBottom: 20
  },
  centerView: {
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER
  },
  statusbar: {
    flexDirection: KEY.ROW,
    alignItems: KEY.CENTER,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.GRANITE_GRAY,
    alignItems: KEY.FLEX_START,
    width: WIDTH - 40,
    height: 45,
    color: COLOR.BLACK_OLIVE,
    marginBottom: 5,
    paddingLeft: 15,
    marginLeft: 20,
    marginRight: 20
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
  },
});

export default styles;