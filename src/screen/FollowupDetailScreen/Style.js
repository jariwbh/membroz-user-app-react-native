import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  touchStyle: {
    width: 40,
    height: 40,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: COLOR.DEFALUTCOLOR
  },
  floatImage: {
    resizeMode: KEY.CONTAIN,
    width: 15,
    height: 15,
    tintColor: COLOR.WHITE
  },
  textTitle: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    width: WIDTH - 50
  },
  textMobile: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
  },
  textTitle2: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_16,
    width: WIDTH / 2
  },
  textsub2: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.MENU_TEXT_COLOR,
    fontSize: FONT.FONT_SIZE_14,
    flex: 1
  },
  textDate: {
    textTransform: KEY.UPPERCASE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_16,
    width: WIDTH - 50
  },
  textEmail: {
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    width: WIDTH - 50
  },
  textsub: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.MENU_TEXT_COLOR,
    fontSize: FONT.FONT_SIZE_16,
  },
  listTab: {
    backgroundColor: COLOR.WHITE,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: KEY.ROW
  },
  btnTab: {
    flexDirection: KEY.ROW,
    width: "50%",
    padding: 10,
    justifyContent: KEY.CENTER
  },
  tabText: {
    fontSize: FONT.FONT_SIZE_18,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK
  },
  tabTextActive: {
    fontSize: FONT.FONT_SIZE_18,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.DEFALUTCOLOR

  },
  tabActive: {
    borderBottomColor: COLOR.DEFALUTCOLOR,
    borderBottomWidth: 3
  },
  msgModalView: {
    height: HEIGHT - 200,
    width: WIDTH - 20,
    borderRadius: 10,
    backgroundColor: COLOR.WHITE,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1
  },
  inputTextView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.BLACK,
    marginBottom: 10,
    width: WIDTH - 60,
    height: 45,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15
  },
  inputTextViewError: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.ERRORCOLOR,
    marginBottom: 10,
    width: WIDTH - 60,
    height: 45,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15
  },
  addressView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.BLACK,
    marginBottom: 10,
    width: WIDTH - 60,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15,
  },
  addressViewError: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.ERRORCOLOR,
    marginBottom: 10,
    width: WIDTH - 60,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15,
  },
  btnStyle: {
    marginTop: 5,
    bottom: 20,
    height: 30,
    width: 100,
    backgroundColor: COLOR.DEFALUTCOLOR,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    borderRadius: 10,
    color: COLOR.DEFALUTCOLOR
  }
});

export default styles;