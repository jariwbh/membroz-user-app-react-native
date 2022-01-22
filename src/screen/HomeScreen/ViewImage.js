import React from 'react';
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function ViewImage(props) {
    const viewimage = props.route.params.viewimage;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <View style={{
                flex: 1,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: KEY.CENTER,
                marginTop: -100
            }}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image source={{ uri: viewimage }} resizeMode={KEY.STRETCH} style={{ height: 500, width: WIDTH, borderRadius: 5 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}
