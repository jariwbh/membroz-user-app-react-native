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
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function ViewImage(props) {
    const viewimage = props.route.params.viewimage;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.GRANITE_GRAY} barStyle={KEY.DARK_CONTENT} />
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
