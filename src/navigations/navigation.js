import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SPLASHSCREEN from '../screen/SplashScreen/SplashScreen';
import HOMESCREEN from '../screen/HomeScreen/HomeScreen';
import LOGINSCREEN from '../screen/LoginScreen/LoginScreen';
import PROFILESCREEN from '../screen/ProfileScreen/ProfileScreen';
import UPDATEPROFILESCREEN from '../screen/ProfileScreen/UpdateProfileScreen';
import FORGOTPASSWORDSCREEN from '../screen/ForgotPasswordScreen/ForgotPasswordScreen';
import NOTIFICATIONSCREEN from '../screen/HomeScreen/NotificationScreen';
import GALLERYSCREEN from '../screen/HomeScreen/GalleryScreen';
import CALENDARSCREEN from '../screen/CalendarScreen/CalendarScreen';
import EVENTSCREEN from '../screen/EventScreen/EventScreen';
import MYBOOKINGSCREEN from '../screen/MyBookingScreen/MyBookingScreen';
import SUPPORTSCREEN from '../screen/SupportScreen/SupportScreen';
import ANNOUNCEMENTSCREEN from '../screen/AnnouncementScreen/AnnouncementScreen';
import REFERFRIENDSCREEN from '../screen/Refer_a_friend_screen/ReferFriendScreen';
import SUPPORTTICKETSCREEN from '../screen/SupportScreen/SupportTicketScreen';
import REFERFRIENDREQUEST from '../screen/Refer_a_friend_screen/ReferFriendRequest';
import CALENDARLIST from '../screen/CalendarScreen/CalendarList';
import BOOKNOWSCREEN from '../screen/MyBookingScreen/BookNowScreen';
import OFFERSCREEN from '../screen/OfferScreen/OfferScreen';
import SELECTLOCATION from '../screen/MyBookingScreen/SelectLocation';
import ONLINEMEETINGSCREEN from '../screen/OnlineMeetingScreen/OnlineMeetingScreen';
import RESETPASSWORDSCREEN from '../screen/ProfileScreen/ResetPasswordScreen';
import PASSWORDCHANGESCREEN from '../screen/ProfileScreen/PasswordChangeScreen';
import OFFERDETAIL from '../screen/OfferScreen/OfferDetail';
import VIEWIMAGE from '../screen/HomeScreen/ViewImage';
import WEBVIEWSCREEN from '../screen/WebViewScreen/WebViewScreen';
import NEWPASSWORDSCREEN from '../screen/ForgotPasswordScreen/NewPasswordScreen';

import * as COLOR from '../styles/colors';
import * as IMAGE from '../styles/image';
import * as KEY from '../context/actions/key';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const OfferStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
            <AuthStack.Screen
                name="LoginScreen"
                component={LOGINSCREEN}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen name="ForgotPasswordScreen" component={FORGOTPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Forgot Password',
                headerTintColor: COLOR.WHITE,
                headerTransparent: true
            }} />
            <AuthStack.Screen name="NewPasswordScreen" component={NEWPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Forgot Password',
                headerTintColor: COLOR.WHITE,
                headerTransparent: true
            }} />
        </AuthStack.Navigator>
    );
}

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShadowVisible: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={PROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Profile',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />

            <ProfileStack.Screen name="ResetPasswordScreen" component={RESETPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Change Password',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <ProfileStack.Screen name="PasswordChangeScreen" component={PASSWORDCHANGESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Change Password',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />

            <ProfileStack.Screen name="UpdateProfileScreen" component={UPDATEPROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Update Profile',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
        </ProfileStack.Navigator>
    );
}

const OfferStackScreen = () => {
    return (
        <OfferStack.Navigator initialRouteName="OfferScreen" screenOptions={{ headerShadowVisible: false }}>
            <OfferStack.Screen name="OfferScreen" component={OFFERSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Offer',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <OfferStack.Screen name="OfferDetail" component={OFFERDETAIL} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Offer',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
        </OfferStack.Navigator>
    );
}

// const WalletStackScreen = () => {
//     return (
//         <WalletStack.Navigator initialRouteName="WalletScreen" screenOptions={{ headerShadowVisible: false }}>
//             <WalletStack.Screen name="WalletScreen" component={WALLETSCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: 'Wallet',
//                 headerTintColor: COLOR.WHITE,
//                 headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
//             }} />
//         </WalletStack.Navigator>
//     );
// }

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShadowVisible: false }}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HOMESCREEN}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen name="ProfileScreen" component={PROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Profile',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="ViewImage" component={VIEWIMAGE} options={{
                headerTitleAlign: KEY.CENTER,
                title: '',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.BLACK }
            }} />
            <HomeStack.Screen name="OnlineMeetingScreen" component={ONLINEMEETINGSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Online Meet',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="UpdateProfileScreen" component={UPDATEPROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Update Profile',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="NotificationScreen" component={NOTIFICATIONSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Notification',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="GalleryScreen" component={GALLERYSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Gallery',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="SupportScreen" component={SUPPORTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Support',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="CalendarScreen" component={CALENDARSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Calendar',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="EventScreen" component={EVENTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Event',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="MyBookingScreen" component={MYBOOKINGSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'My Booking',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="AnnouncementScreen" component={ANNOUNCEMENTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Announcement',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="ReferFriendScreen" component={REFERFRIENDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Refer a Friend',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="SupportTicketScreen" component={SUPPORTTICKETSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Support Ticket',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="ReferFriendRequest" component={REFERFRIENDREQUEST} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Refer a Friend Request',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="CalendarList" component={CALENDARLIST} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Holiday List',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="BookNowScreen" component={BOOKNOWSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Booking',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="SelectLocation" component={SELECTLOCATION} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Booking',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen
                name="WebViewScreen"
                component={WEBVIEWSCREEN}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'home' : 'home'}
                                size={25}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Offers') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-gift' : 'ios-gift'}
                                size={25}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Wallet') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-wallet' : 'ios-wallet'}
                                size={25}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Profile') {
                        return (
                            <FontAwesome
                                name={focused ? 'user' : 'user'}
                                size={25}
                                color={color}
                            />
                        );
                    }
                },
                tabBarActiveTintColor: COLOR.DEFALUTCOLOR,
                tabBarInactiveTintColor: COLOR.GREY,
                tabBarStyle: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarHideOnKeyboard: true
            })}
            backBehavior="initialRoute"
        >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ unmountOnBlur: true, headerShown: false }} />
            <Tab.Screen name="Offers" component={OfferStackScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Wallet" component={WalletStackScreen} options={{ headerShown: false }} /> */}
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SPLASHSCREEN} options={{ headerShown: false }} />
                <Stack.Screen name="Tabnavigation" component={TabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}