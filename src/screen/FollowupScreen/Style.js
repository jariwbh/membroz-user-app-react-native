import React from 'react';
import {
  StyleSheet, Dimensions
} from 'react-native';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as KEY from '../../context/actions/key';

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
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18
  },
  textsub: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    width: WIDTH - 150
  },
  textsubCallBtn: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.WHITE,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    marginRight: 10
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
  textDate: {
    textTransform: KEY.UPPERCASE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18
  }
});

export default styles;