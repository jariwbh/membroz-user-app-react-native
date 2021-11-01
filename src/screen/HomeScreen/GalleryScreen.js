import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    View, Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { GalleryService } from '../../services/GalleryService/GalleryService';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const GalleryScreen = (props) => {
    const [galleryList, setGalleryList] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);
        getGalleryImages();
    }, []);

    useEffect(() => {
    }, [galleryList])

    //IMAGE GALLERY FUNCTION FETCH DATA THROUGHT API
    const getGalleryImages = async () => {
        try {
            const response = await GalleryService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                wait(1000).then(() => {
                    setGalleryList(response.data);
                    setloading(false);
                });
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //IMAGE CLICK TO VIEW IMAGE FUNCTION
    const viewImage = (val) => {
        let viewimage;
        if (val.path != null) {
            viewimage = val.path;
            props.navigation.navigate(SCREEN.VIEWIMAGE, { viewimage });
        }
    }

    //RENDER SCHOOLGALLERY USING FLATLIST
    const renderGalleryImage = ({ item }) => (
        <TouchableOpacity onPress={() => viewImage(item)}
            style={{ marginTop: 5, justifyContent: KEY.SPACEBETWEEN, margin: 5 }}>
            <Image source={{ uri: item?.path }}
                style={{ height: HEIGHT / 3, width: WIDTH / 2 - 20, borderRadius: 10 }} />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />
            <Image source={IMAGE.HEADER} resizeMode={KEY.STRETCH} style={{ width: WIDTH, height: 60, marginTop: 0, tintColor: COLOR.DEFALUTCOLOR }} />
            {(galleryList == null) || (galleryList && galleryList.length > 0)
                ?
                <FlatList
                    numColumns={2}
                    data={galleryList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderGalleryImage}
                    contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER, marginTop: 10 }}
                    keyExtractor={item => item._id}
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
export default GalleryScreen;


