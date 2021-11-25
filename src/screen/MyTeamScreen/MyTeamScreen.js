import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    View, TouchableOpacity,
    StatusBar, RefreshControl, FlatList
} from 'react-native';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import Loader from '../../components/loader';
import styles from './Style';
import { UserListService } from '../../services/UserService/UserService';
import * as LocalService from '../../services/LocalService/LocalService';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;

export default MyTeamScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [teamList, setTeamList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMyTeamList();
    }, [])

    useEffect(() => {
    }, [loading])

    const onRefresh = () => {
        setrefreshing(true);
        getMyTeamList();
        wait(3000).then(() => setrefreshing(false));
    }

    //GET MYTEAM API THROUGH FETCH DATA
    const getMyTeamList = async () => {
        try {
            const response = await UserListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setLoading(false);
                setTeamList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setLoading(false);
        }
    }

    //RENDER REFER FRIEND LIST USING FLATLIST
    const renderMyTeamList = ({ item }) => (
        <View style={styles.cardView}>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, width: 250, padding: 5, flex: 1 }}>
                <View style={{ flexDirection: KEY.COLUMN, alignItems: KEY.FLEX_START }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD, textTransform: KEY.CAPITALIZE }}>{item.property && item.property.fullname}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{item.property && item.property.mobile}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{item.property && item.property.primaryemail}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.GRANITE_GRAY }}>{item.property && item.property.date_of_birth ? moment(item.property.date_of_birth).format('LL') : moment(item.property.dob).format('LL')}</Text>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {teamList && teamList.length > 0 ?
                <FlatList
                    style={{ marginTop: 10 }}
                    data={teamList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderMyTeamList}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    keyExtractor={item => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            title="Pull to refresh"
                            tintColor={COLOR.DEFALUTCOLOR}
                            titleColor={COLOR.DEFALUTCOLOR}
                            colors={[COLOR.DEFALUTCOLOR]}
                            onRefresh={onRefresh} />
                    }
                />
                :
                loading == false ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                    </View>
                    : <Loader />
            }
        </SafeAreaView>
    );
}


