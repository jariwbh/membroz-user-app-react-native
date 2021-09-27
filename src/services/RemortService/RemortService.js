import AsyncStorage from "@react-native-community/async-storage";
import { AUTHUSER, REMOTEDATA } from "../../context/actions/type";

// REMOTECONTROLLER USE TO AUTOCONFIG APP COLOR
export const RemoteColor = async () => {
    var getRemote = await AsyncStorage.getItem(REMOTEDATA);
    var remoteData = JSON.parse(getRemote);
    if (remoteData) {
        return remoteData.appcolor;
    } else {
        return '#FC7845';
    }
};

// REMOTECONTROLLER USE TO AUTOCONFIG APP
export const RemoteService = async () => {
    var getRemote = await AsyncStorage.getItem(REMOTEDATA);
    var remoteData = JSON.parse(getRemote);
    return remoteData;
};
