import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
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
import Toast from 'react-native-simple-toast';
import { ReferFriendService } from '../../services/ReferFriendService/ReferaFriendService';
import * as LocalService from '../../services/LocalService/LocalService';

const WIDTH = Dimensions.get('window').width;

const ReferFriendRequest = (props) => {

    const [loading, setLoading] = useState(true);
    const [memberID, setMemberID] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [mobileno, setMobileno] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        setLoading(true);
        getMemberDeatilsLocalStorage();
    }, [])

    // GET MEMBER DATA LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memderInfo = await LocalService.LocalStorageService();
        setMemberID(memderInfo._id);
    }

    //GET BALANCE CARDNO FUNCTION
    const getUserData = async () => {
        let body = {
            "property": {
                "fullname": fullname,
                "primaryemail": email,
                "mobile": mobileno,
                "handlerid": memberID,
            },
            "handlerid": memberID,
            "fullname": fullname
        }
        const response = await ReferFriendService(body);
        Toast.show('Submitted successfully', Toast.SHORT);
        props.navigation.replace(SCREEN.REFERFRIENDSCREEN)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containView}>
                    <TextInput placeholder='Fullname'
                        style={styles.textSubject}
                        onChangeText={(name) => setFullname(name)}></TextInput>
                    <TextInput placeholder='Mobile No'
                        keyboardType='number-pad'
                        style={styles.textDescription}
                        onChangeText={(mobileno) => setMobileno(mobileno)}></TextInput>
                    <TextInput placeholder='Email'
                        style={styles.textDescription}
                        onChangeText={(email) => setEmail(email)}></TextInput>
                    <TouchableOpacity style={styles.btnSubmit} onPress={() => getUserData()} >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default ReferFriendRequest;



