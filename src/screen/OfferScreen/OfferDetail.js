import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    View, Image, Text,
    StatusBar, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import styles from './OfferDetailStyle';
import RenderHTML from "react-native-render-html";
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;

const OfferDetail = (props) => {
    const coupenDetail = props.route.params.item;
    const html = `${coupenDetail?.property?.description}`;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.ImageView}>
                    <Image source={IMAGE.COUPON} resizeMode={KEY.STRETCH} style={{ height: 130, width: WIDTH - 100 }} />
                </View>
                <View style={styles.containerView}>
                    <View style={{ flexDirection: KEY.ROW }}>
                        <Icon name='rupee' size={20} style={{ marginTop: 5, marginRight: 5, color: COLOR.TAUPE_GRAY }} />
                        <Text style={styles.headerText}>{(coupenDetail.property.value).toFixed(2)}</Text>
                    </View>
                    <Text style={styles.headerText}>{coupenDetail.property.couponcode}</Text>
                    <Text style={styles.headerText}>{coupenDetail && coupenDetail.property && coupenDetail.property.end_date != null ? 'Valid Until ' + moment(coupenDetail.property.end_date).format('LL') : 'Coupon Code Expire'} </Text>
                    <Text style={styles.usageText}>Usage Conditions :</Text>
                    {coupenDetail?.property?.description ?
                        <RenderHTML contentWidth={WIDTH - 60} source={{ html }} baseStyle={{ fontSize: 14, color: COLOR.GRANITE_GRAY, width: WIDTH - 60, marginBottom: 20, marginTop: 10 }} />
                        :
                        <Text style={{ marginTop: 20, fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY }} >No Instructions Available </Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default OfferDetail;


