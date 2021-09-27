import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View, Image, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, StatusBar
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const BookNowScreen = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const [selected, setSelected] = useState();
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = (event, value) => {
        setDatePickerVisibility(false);
        setDate(value)
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked :", date);
        hideDatePicker();
    };

    const onPressSubmit = () => {
        props.navigation.replace(SCREEN.MYBOOKINGSCREEN);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ marginTop: 20, marginBottom: 150 }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Location</Text>
                        <TextInput onTouchStart={() => props.navigation.navigate(SCREEN.SELECTLOCATION)} placeholder='Select Location' style={styles.textSubject} />
                        <TouchableOpacity>
                            <Image source={IMAGE.PLACEHOLDER} resizeMode={KEY.CONTAIN} style={{ height: 40, width: 25, tintColor: COLOR.TAUPE_GRAY, marginLeft: WIDTH - 80, marginTop: -40 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Checkin date</Text>
                        <TextInput Value={date} onTouchStart={() => showDatePicker()} placeholder='Select Date' style={styles.textSubject}
                            onSubmitEditing={() => { Keyboard.dismiss(), onPressSubmit() }} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <TouchableOpacity>
                            <Image source={IMAGE.CALENDAR} resizeMode={KEY.CONTAIN} style={{ height: 40, width: 25, tintColor: COLOR.TAUPE_GRAY, marginLeft: WIDTH - 80, marginTop: -40 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 15 }}>
                        <Text onSubmitEditing={Keyboard.dismiss} style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Checkout date</Text>
                        <TextInput onTouchStart={() => showDatePicker()} placeholder='Select Date' style={styles.textSubject} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <TouchableOpacity>
                            <Image source={IMAGE.CALENDAR} resizeMode={KEY.CONTAIN} style={{ height: 40, width: 25, tintColor: COLOR.TAUPE_GRAY, marginLeft: WIDTH - 80, marginTop: -40 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 15, marginRight: 30 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Reservation Types</Text>
                        <TextInput style={styles.textSubject} />
                        <Picker style={{ marginTop: -50 }}
                            selectedValue={selected}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelected(itemValue)
                            }>
                            <Picker.Item label="REGULAR NIGHTS" value="regular" />
                            <Picker.Item label="SPECIAL OFFER" value="special" />
                            <Picker.Item label="COMPLIMENTARY NIGHTS" value="compliment" />
                        </Picker>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 15, marginRight: 30 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Total Room</Text>
                        <TextInput style={styles.textSubject} />
                        <Picker style={{ marginTop: -50 }}
                            selectedValue={selected}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelected(itemValue)
                            }>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                        </Picker>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, alignItems: KEY.FLEX_START }}>Room 1</Text>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <TextInput keyboardType={'number-pad'} placeholder='Adults' inp style={styles.viewRoom} />
                            <TextInput keyboardType={'number-pad'} placeholder='Children' inp style={styles.viewRoom} />
                            <TextInput keyboardType={'number-pad'} placeholder='Extra Bed' inp style={styles.viewRoom} />
                        </View>
                        <TextInput placeholder='Guest' style={styles.textSubject} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.btnSubmit} onPress={() => onPressSubmit()} >
                <Text style={styles.btnText}>Book Now</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default BookNowScreen;

const styles = StyleSheet.create({
    // containerView:{
    //     justifyContent:KEY.CENTER,
    //     alignItems:KEY.CENTER
    // },
    textSubject: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOR.TAUPE_GRAY,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 30,
        height: 45,
        marginTop: 5,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15
    },
    btnSubmit: {
        borderRadius: 30,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        position: KEY.ABSOLUTE,
        bottom: 60,
        right: 20,
        left: 20
    },
    btnText: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_BOLD
    },
    viewRoom: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLOR.TAUPE_GRAY,
        alignItems: KEY.FLEX_START,
        width: WIDTH / 4,
        height: 45,
        marginTop: 5,
        fontSize: FONT.FONT_SIZE_16,
        paddingLeft: 15,
        marginRight: 20,
        marginBottom: 5
    }
});

