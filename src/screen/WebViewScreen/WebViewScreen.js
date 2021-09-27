import React, { useState, useEffect } from 'react';
import {
    View, SafeAreaView,
    TouchableOpacity, Dimensions,
    ActivityIndicator, StatusBar,
    StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import Entypo from 'react-native-vector-icons/Entypo';
const WIDTH = Dimensions.get('window').width;

const WebViewScreen = (props) => {
    const URI = props.route.params.url;
    const [title, settitle] = useState('');

    const _onNavigationStateChange = (webViewState) => {
        settitle(webViewState.url);
    }

    function LoadingIndicatorView() {
        return (
            <ActivityIndicator
                color={COLOR.DEFALUTCOLOR}
                size='large'
                style={styles.IndicatorStyle} />
        );
    }

    useEffect(() => {
    }, [title]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <View style={{ flexDirection: KEY.ROW }}>
                <View style={{ justifyContent: KEY.FLEX_END, alignItems: KEY.FLEX_END, marginLeft: 15, marginTop: 30 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                        <Entypo name='cross' size={30} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <WebView
                source={{ uri: URI }}
                // onNavigationStateChange={_onNavigationStateChange}
                renderLoading={LoadingIndicatorView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />

        </SafeAreaView>
    )
}

export default WebViewScreen;

const styles = StyleSheet.create({
    IndicatorStyle: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});
