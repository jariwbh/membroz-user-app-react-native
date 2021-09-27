import AsyncStorage from "@react-native-community/async-storage";
import { AUTHUSER, AUTHUSERINFO } from "../../context/actions/type";

// REMOTECONTROLLER USE TO AUTOCONFIG APP
export const LocalStorageService = async () => {
    var getUser = await AsyncStorage.getItem(AUTHUSER);
    var userData = JSON.parse(getUser);
    return userData;
};

//add local storage Records
export const AuthenticateUser = (user) => (
    AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
)

//add local storage Records
export const RemoveAuthenticateUser = () => (
    AsyncStorage.removeItem(AUTHUSER), AsyncStorage.removeItem(AUTHUSERINFO)
)

// REMOTECONTROLLER USE TO AUTOCONFIG APP
export const LocalLoginStorageService = async () => {
    var getLoginUser = await AsyncStorage.getItem(AUTHUSERINFO);
    var getLoginUser = JSON.parse(getLoginUser);
    return getLoginUser;
};
