import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import styles from './Style'
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
const WIDTH = Dimensions.get('window').width;

const Tab = [
    { status: 'HOLIDAYS' }, { status: 'EVENT' }, { status: 'BOOKING' }
]
const CalendarList = (props) => {

    const [status, setStatus] = useState('HOLIDAYS');
    const TabFilter = status => {
        setStatus(status);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containerView}>
                    <View style={styles.view}>
                        {
                            Tab.map(e => (
                                <TouchableOpacity style={[styles.btnTab, status === e.status && styles.tabActive]} onPress={() => TabFilter(e.status)}>
                                    <Text style={styles.tabText}>
                                        {e.status}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={styles.viewRectangle}>
                        <View style={{ width: 70, flexDirection: KEY.COLUMN, borderRadius: 8, backgroundColor: COLOR.DEFALUTCOLOR }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.WHITE, marginTop: 10, paddingLeft: 25 }}>7 </Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.WHITE, paddingLeft: 20 }}>Sep</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                            <Text style={styles.rectangleText}>Agra </Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY }}>Hotelbooking</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default CalendarList;




