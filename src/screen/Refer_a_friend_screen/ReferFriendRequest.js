import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import styles from './Style';
const WIDTH = Dimensions.get('window').width;

const ReferFriendRequest = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containView}>
                    <TextInput placeholder='Fullname' style={styles.textSubject}></TextInput>
                    <TextInput placeholder='Mobile No' keyboardType='number-pad' style={styles.textDescription}></TextInput>
                    <TextInput placeholder='Email' style={styles.textDescription}></TextInput>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => props.navigation.navigate(SCREEN.REFERFRIENDSCREEN)} >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default ReferFriendRequest;



