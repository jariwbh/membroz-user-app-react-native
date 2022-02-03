import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView, View,
  Image, Text,
  TouchableOpacity, ScrollView,
  TextInput, StatusBar,
  Keyboard, Platform, Modal
} from 'react-native';
import { HelpSupportService } from '../../services/HelpSupportService/HelpSupportService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import MyPermissionController from '../../helpers/appPermission';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as ImagePicker from "react-native-image-picker";
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './Style';

const WIDTH = Dimensions.get('window').width;

const SupportTicketScreen = (props) => {
  const [loading, setloading] = useState(false);
  const [userID, setUserID] = useState(null);
  const [subject, setSubject] = useState(null);
  const [subjectError, setSubjectError] = useState(null);
  const [description, setDescription] = useState(null);
  const [DescriptionError, setDescriptionError] = useState(null);
  const [supportImage, setSupportImage] = useState(null);
  const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
  const [memderInfo, setMemderInfo] = useState(null);
  const secondTextInputRef = React.createRef();

  useEffect(() => {
    //LANGUAGE MANAGEMENT FUNCTION
    MemberLanguage();
    checkPermission();
    getUserDeatilsLocalStorage();
  }, []);

  useEffect(() => {
  }, [loading, userID, subject, subjectError, description, DescriptionError, supportImage]);

  //check permission 
  const checkPermission = () => {
    setTimeout(
      () => {
        MyPermissionController.checkAndRequestStoragePermission()
          .then((granted) => console.log('>Storage Permission Granted'))
          .catch((err) => console.log(err))
      },
      500
    );
  }

  //GET USER DATA IN MOBILE LOCAL STORAGE
  const getUserDeatilsLocalStorage = async () => {
    var memderInfo = await LocalService.LocalStorageService();
    setMemderInfo(memderInfo);
    setUserID(memderInfo._id);
  }

  //CHECK VALIDATION OF SUBJECT
  const checkSubject = (subject) => {
    if (!subject || subject <= 0) {
      return setSubjectError(languageConfig.supportsubjecterror);
    }
    setSubject(subject);
    setSubjectError(null);
    return;
  }

  //CHECK VALIDATION OF DESCRIPTION
  const checkDescription = (description) => {
    if (!description || description <= 0) {
      return setDescriptionError(languageConfig.supportquery);
    }
    setDescription(description);
    setDescriptionError(null);
    return;
  }

  //HELP MODEL POP UP SUBMIT BUTTON TOUCH TO CALLED
  const onPressSubmit = async () => {
    if (!description || !subject) {
      checkSubject(subject);
      checkDescription(description);
      return;
    }

    const body = {
      'status': 'Requested',
      'subject': subject,
      'customerid': userID,
      'onModel': 'User',
      'category': 'Support',
      'content': description,
      "attachments": [
        {
          "attachment": supportImage,
          "extension": "png",
          "originalfilename": memderInfo.branchid.branchname
        }
      ]
    }

    setloading(true);
    try {
      const response = await HelpSupportService(body);
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        Toast.show(languageConfig.supportticket, Toast.LONG);
        setloading(false);
        setSubject(null);
        setSubjectError(null);
        setDescription(null);
        setDescriptionError(null);
        props.navigation.navigate(SCREEN.HOMESCREEN)
      }
    }
    catch (error) {
      firebase.crashlytics().recordError(error);
      setloading(false);
      setSubject(null);
      setSubjectError(null);
      setDescription(null);
      setDescriptionError(null);
      Toast.show(languageConfig.supportticketmessage, Toast.LONG);
    }
  }

  //IMAGE CLICK TO GET CALL FUNCTION
  const handlePicker = (value, options) => {
    if (value == 'gallery') {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          setloading(false);
          // console.log('User cancelled image picker');
        } else if (response.error) {
          setloading(false);
          firebase.crashlytics().recordError(response.error);
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          setloading(false);
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          setloading(true);
          onPressUploadFile(response.assets[0]);
        }
      });
    } else if (value == 'camera') {
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          setloading(false);
          // console.log('User cancelled image picker');
        } else if (response.error) {
          setloading(false);
          firebase.crashlytics().recordError(response.error);
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          setloading(false);
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          setloading(true);
          onPressUploadFile(response.assets[0]);
        }
      });
    }
  }

  //Upload Cloud storage function
  const onPressUploadFile = async (fileObj) => {
    if (fileObj != null) {
      const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
      await RNFetchBlob.fetch('POST', CLOUD_URL, { 'Content-Type': 'multipart/form-data' },
        Platform.OS === 'ios' ?
          [{ name: 'file', filename: fileObj.fileSize, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
          { name: 'upload_preset', data: UPLOAD_PRESET }]
          :
          [{ name: 'file', filename: fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(fileObj.uri) },
          { name: 'upload_preset', data: UPLOAD_PRESET }]
      )
        .then(response => response.json())
        .then(data => {
          setloading(false);
          if (data && data.url) {
            setSupportImage(data.url);
          }
        }).catch(error => {
          firebase.crashlytics().recordError(error);
          alert(languageConfig.supportimagefail);
        })
    } else {
      alert(languageConfig.supportimageerror);
    }
  }

  //MODAL POPUP SHOW TO CALL FUNCTION
  const uploadImageOption = (value) => {
    checkPermission();
    handlePicker(value);
    setshowMessageModalVisible(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
      <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
      <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
        <View style={styles.containView}>
          <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
          <Text style={styles.textHeader}>{languageConfig.supportheader}</Text>

          <View style={{ justifyContent: KEY.CENTER }}>
            <TextInput
              selectionColor={COLOR.DEFALUTCOLOR}
              placeholder={languageConfig.subjectplaceholder}
              style={subjectError == null ? styles.textSubject : styles.textSubjectError}
              type={KEY.CLEAR}
              returnKeyType={KEY.NEXT}
              placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
              defaultValue={subject}
              blurOnSubmit={false}
              onSubmitEditing={() => secondTextInputRef.current.focus()}
              onChangeText={(subject) => checkSubject(subject)}
            />
            {subjectError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR }}>{subjectError}</Text>}
          </View>

          <View style={{ justifyContent: KEY.CENTER }}>
            <TextInput
              selectionColor={COLOR.DEFALUTCOLOR}
              placeholder={languageConfig.descriptionplacholder}
              multiline={true}
              numberOfLines={3}
              style={DescriptionError == null ? styles.textDescription : styles.textDescriptionError}
              type={KEY.CLEAR}
              returnKeyType={KEY.DONE}
              placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
              defaultValue={description}
              blurOnSubmit={false}
              ref={secondTextInputRef}
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={(desc) => checkDescription(desc)}
            />
            {DescriptionError && <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR }}>{DescriptionError}</Text>}
          </View>

          <TouchableOpacity onPress={() => { setshowMessageModalVisible(true), Keyboard.dismiss() }}>
            <View pointerEvents="none" style={{ justifyContent: KEY.CENTER }}>
              <TextInput
                placeholder={languageConfig.imageplaceholder}
                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                onSubmitEditing={() => Keyboard.dismiss()}
                style={styles.textDescription} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSubmit} onPress={() => onPressSubmit()} >
            <Text style={styles.btnSubmitText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* message model Pop */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={showMessageModalVisible}
        onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}>
        <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
          <View style={{ position: KEY.ABSOLUTE, bottom: 0 }}>
            <View style={styles.msgModalView}>
              <TouchableOpacity onPress={() => uploadImageOption('camera')} >
                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15 }}>{languageConfig.takephototext}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => uploadImageOption('gallery')} >
                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15, marginBottom: 10 }}>{languageConfig.choosegallerytext}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setshowMessageModalVisible(false)} >
                <Text style={{ fontSize: FONT.FONT_SIZE_20, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 10, marginBottom: 10 }}>{languageConfig.closetext}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
}

export default SupportTicketScreen;



