import React, { useEffect, useState } from 'react';
import MyPermissionController from '../../helpers/appPermission';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import {
    View, StatusBar,
    SafeAreaView, Image,
    ImageBackground, Dimensions,
    ActivityIndicator, Modal,
    Text
} from 'react-native';
import { AUTHUSER, REMOTEDATA, REMOTECONFIGKEY } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import styles from './Styles';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';
import firebase from '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';
const HEIGHT = Dimensions.get('window').height;

function SplashScreen(props) {
    const [logo, setLogo] = useState(null);
    const [splashimage, setSplashimage] = useState(null);
    const [appLogoVisible, setAppLogoVisible] = useState(false);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);

    useEffect(() => {
        // check AuthController use to Login Or Not Login
        splashScreen();
        remoteConfigSetup();
    }, []);

    async function AuthController() {
        var getUser = await AsyncStorage.getItem(AUTHUSER)
        var userData = JSON.parse(getUser);
        if (userData) {
            //set header auth user key
            let token = userData._id;
            axiosConfig(token);
            return props.navigation.replace(SCREEN.TABNAVIGATION);
        } else {
            return props.navigation.replace(SCREEN.AUTH);
        }
    }

    async function splashScreen() {
        var getUser = await AsyncStorage.getItem(REMOTEDATA);
        var userData = JSON.parse(getUser);
        if (userData) {
            setSplashimage(userData.splashimage);
            setAppLogoVisible(userData.applogovisiblesplashscreen);
            setLogo(userData.applogo);
            checkPermission();
            setTimeout(() => {
                AuthController();
            }, 3000);
        } else {
            setshowMessageModalVisible(true);
            Toast.show('Initialization application', Toast.SHORT);
            setTimeout(() => {
                setshowMessageModalVisible(false);
                // Immediately reload the React Native Bundle
                RNRestart.Restart();
            }, 10000);
        }
    }

    async function remoteConfigSetup() {
        await remoteConfig()
            .setDefaults({
                REMOTECONFIGKEY: 'disabled',
            })
            .then(() => {
                console.log('Default values set.');
            });

        await remoteConfig()
            .setDefaults({
                REMOTECONFIGKEY: 'disabled',
            })
            .then(() => remoteConfig().fetchAndActivate())
            .then(fetchedRemotely => {
                if (fetchedRemotely) {
                    console.log('Configs were retrieved from the backend and activated.');
                } else {
                    console.log(
                        'No configs were fetched from the backend, and the local configs were already activated',
                    );
                }
            });

        await remoteConfig().setConfigSettings({
            minimumFetchIntervalMillis: 30000,
        });

        const configValue = firebase.remoteConfig().getValue(REMOTECONFIGKEY);
        let remoteConfigValue = configValue.asString();
        AsyncStorage.setItem(REMOTEDATA, remoteConfigValue);
    }

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

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
            <ImageBackground source={splashimage ? { uri: splashimage } : IMAGE.BACKGROUND_IMAGE} resizeMode={KEY.COVER} style={styles.imageStyle} >
                {appLogoVisible ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: HEIGHT / 2.5 }}>
                        <Image style={styles.imageLogo} resizeMode={KEY.STRETCH} source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} />
                    </View> : <></>
                }
            </ImageBackground>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}
            >
                <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0 }}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <View style={styles.msgModalView}>
                                <View style={{ marginTop: 20 }}>
                                    <ActivityIndicator
                                        size='large'
                                        color={COLOR.BLACK}
                                        style={{
                                            left: Platform.OS === 'ios' ? 1.3 : 0,
                                            top: Platform.OS === 'ios' ? 1 : 0,
                                        }}
                                    />
                                </View>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, marginTop: 25, textTransform: KEY.CAPITALIZE }}>initialization your app </Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, textTransform: KEY.CAPITALIZE }}>please wait few Seconds</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, textTransform: KEY.CAPITALIZE }}>auto restart app</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
export default SplashScreen;
