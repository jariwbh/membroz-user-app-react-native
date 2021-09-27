import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View, Image, Text,
    StatusBar, TouchableOpacity, FlatList
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import * as SCREEN from '../../context/screen/screenName';
import { Button, Snackbar } from 'react-native-paper';
import styles from './OfferScreenStyle';
import { OfferService } from '../../services/OfferService/OfferService';
import Loader from '../../components/loader/index';
import Clipboard from '@react-native-community/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const WIDTH = Dimensions.get('window').width;

const OfferScreen = (props) => {
    //CouponList FUNCTION FETCHING DATA THROUGH API
    const [couponList, setCoupenList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(true);

    //TOST FOR COPY
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            CouponList();
        }, [])
    );

    useEffect(() => {
        setloading(true);
        CouponList();
    }, []);

    useEffect(() => {
    }, [couponList]);

    //GET COUPON LIST FUNCTION FETCH API 
    const CouponList = async () => {
        try {

        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
        const response = await OfferService();
        if (response.data != null && response.data != 'undefind' && response.status == 200) {
            wait(1000).then(() => {
                setCoupenList(response.data);
                setloading(false);
            });
        }
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const copyToClipboard = (value) => {
        Clipboard.setString(value);
    };

    //RENDER COUPONLIST USING FLATLIST
    const renderCouponList = ({ item }) => (
        moment(item && item.property && item.property.end_date).format() >= moment().format() &&
        <TouchableOpacity style={styles.viewRectangle} onPress={() => props.navigation.navigate(SCREEN.OFFERDETAIL, { item })} >
            <View style={styles.viewSquare}>
                <Image source={IMAGE.BLACKTAG} style={{ height: 35, width: 30 }} />
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                <Text style={styles.rectangleText}> {item?.property?.couponcode} </Text>
                {moment(item && item.property && item.property.end_date).format() >= moment().format() ?
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, textTransform: KEY.CAPITALIZE }}>
                        {'Valid Until ' + moment(item && item.property && item.property.end_date).format('ll')}
                    </Text>
                    :
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, textTransform: KEY.CAPITALIZE }}>
                        {'coupon code expire '}
                    </Text>
                }
            </View>
            <TouchableOpacity
                onPress={() => { onToggleSnackBar(), copyToClipboard(item?.property?.couponcode) }}
                style={{ flex: 1, alignItems: KEY.FLEX_END, marginRight: 10, marginTop: 15 }}>
                <Image source={IMAGE.COPY} style={{ height: 25, width: 25, tintColor: COLOR.DEFALUTCOLOR }} />
            </TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(couponList == null) || (couponList && couponList.length > 0)
                ?
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={styles.containerView}>
                        <Image source={IMAGE.CROWN_BIG} style={{ height: 65, width: 80 }} />
                        <Text style={styles.headerText}>Your Offers</Text>
                        <FlatList
                            data={couponList}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderCouponList}
                            contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER, marginTop: 10 }}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </ScrollView>
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                    </View>
                    : <Loader />
            }
            <Snackbar
                visible={visible}
                onDismiss={() => onDismissSnackBar()}
                action={{
                    label: 'Undo',
                    onPress: () => { },
                }}>
                Copied to clipboard
            </Snackbar>

        </SafeAreaView>
    );
}
export default OfferScreen;


