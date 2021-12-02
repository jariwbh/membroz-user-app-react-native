import React, { useEffect, useState } from 'react';
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
import SUPPORTSCREEN from '../screen/SupportScreen/SupportScreen';
import SUPPORTTICKETSCREEN from '../screen/SupportScreen/SupportTicketScreen';
import PASSWORDCHANGESCREEN from '../screen/ProfileScreen/PasswordChangeScreen';
import VIEWIMAGE from '../screen/HomeScreen/ViewImage';
import WEBVIEWSCREEN from '../screen/WebViewScreen/WebViewScreen';
import NEWPASSWORDSCREEN from '../screen/ForgotPasswordScreen/NewPasswordScreen';
import TASKSCREEN from '../screen/TaskScreen/TaskScreen';
import FRESHLEADSCREEN from '../screen/FreshLeadScreen/FreshLeadScreen';
import FOLLOWUPSCREEN from '../screen/FollowupScreen/FollowupScreen';
import MEETINGSCREEN from '../screen/MeetingScreen/MeetingScreen';
import MYLEADSCREEN from '../screen/MyLeadScreen/MyLeadScreen';
import FOLLOWUPDETAILSCREEN from '../screen/FollowupDetailScreen/FollowupDetailScreen';
import ADDLEADSCREEN from '../screen/MyLeadScreen/AddLeadScreen';
import TICKETHISTORYSCREEN from '../screen/SupportScreen/TicketHistoryScreen';
import ANNOUNCEMENTSCREEN from '../screen/AnnouncementScreen/AnnouncementScreen';
import ADDLEAVESCREEN from '../screen/LeaveScreen/AddLeaveScreen';
import LEAVESCREEN from '../screen/LeaveScreen/LeaveScreen';
import MYCLAIMSCREEN from '../screen/MyClaimScreen/MyClaimScreen';
import ADDCLAIMSCREEN from '../screen/MyClaimScreen/AddClaimScreen';
import MYTEAMSCREEN from '../screen/MyTeamScreen/MyTeamScreen';
import REFERFRIENDREQUEST from '../screen/Refer_a_friend_screen/ReferFriendRequest';
import REFERFRIENDSCREEN from '../screen/Refer_a_friend_screen/ReferFriendScreen';
import SALARYSCREEN from '../screen/SalaryScreen/SalaryScreen';
import TIMESHEETSCREEN from '../screen/TimesheetScreen/TimesheetScreen';
import ATTENDANCESCREEN from '../screen/AttendanceScreen/AttendanceScreen';
import SCANNERSCREEN from '../screen/HomeScreen/ScannerScreen';
import VIEWIMAGESCREEN from '../screen/ViewImageScreen/ViewImageScreen';
import * as COLOR from '../styles/colors';
import * as IMAGE from '../styles/image';
import * as KEY from '../context/actions/key';
import { Image, LogBox, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as LocalService from '../services/LocalService/LocalService';

const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TaskStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//STATIC DATA
let MenuDefaultArray = [
    { "menuname": "task" }
];

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
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
                headerTransparent: true
            }} />
            <AuthStack.Screen name="NewPasswordScreen" component={NEWPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Forgot Password',
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
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

const TaskStackScreen = () => {
    return (
        <TaskStack.Navigator initialRouteName="TaskScreen" screenOptions={{ headerShadowVisible: false }}>
            <TaskStack.Screen name="TaskScreen" component={TASKSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Tasks',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
        </TaskStack.Navigator>
    );
}

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShadowVisible: false }} >
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
            <HomeStack.Screen name="View Profile" component={VIEWIMAGESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: '',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.BLACK }
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
            <HomeStack.Screen name="SupportTicketScreen" component={SUPPORTTICKETSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Support Ticket',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="TicketHistoryScreen" component={TICKETHISTORYSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Ticket History',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="FreshLeadScreen" component={FRESHLEADSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Fresh Call',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="FollowupScreen" component={FOLLOWUPSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Follow Up',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="MeetingScreen" component={MEETINGSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Meeting',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="MyLeadScreen" component={MYLEADSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'My Lead',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="AddLeadScreen" component={ADDLEADSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Add Lead',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="FollowupDetailScreen" component={FOLLOWUPDETAILSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Follow Up',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="AnnouncementScreen" component={ANNOUNCEMENTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: 'Announcement',
                headerTintColor: COLOR.WHITE,
                headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
            }} />
            <HomeStack.Screen name="AddLeaveScreen" component={ADDLEAVESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Leave Request',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="LeaveScreen" component={LEAVESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'My Leaves',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="MyClaimScreen" component={MYCLAIMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'My Claims',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="AddClaimScreen" component={ADDCLAIMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Claim Request',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="MyTeamScreen" component={MYTEAMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Teams',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="ReferFriendRequest" component={REFERFRIENDREQUEST}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Refer Friend',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="ReferFriendScreen" component={REFERFRIENDSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Refer Friends',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="SalaryScreen" component={SALARYSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'My Salary',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="TimesheetScreen" component={TIMESHEETSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Time sheet',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="AttendanceScreen" component={ATTENDANCESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: 'Attendance',
                    headerTintColor: COLOR.WHITE,
                    headerStyle: { backgroundColor: COLOR.DEFALUTCOLOR }
                }} />
            <HomeStack.Screen name="ScannerScreen"
                component={SCANNERSCREEN}
                options={{ headerShown: false }} />

            <HomeStack.Screen
                name="WebViewScreen"
                component={WEBVIEWSCREEN}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

const TabNavigation = () => {
    const [taskVisible, setTaskVisible] = useState(false);

    useEffect(() => {
        MenuPermission();
    }, []);

    useEffect(() => {
    }, [taskVisible]);

    //CHECK MENU PERMISSION FUNCTION
    const MenuPermission = async () => {
        var userInfo = await LocalService.LocalStorageService();
        if (userInfo) {
            let mobileapppermissions = userInfo.role.mobileapppermissions;
            mobileapppermissions.forEach(MobileEle => {
                let filter = MenuDefaultArray.find(e => e.menuname == MobileEle);
                if (filter && filter != undefined && filter.menuname == 'task') {
                    setTaskVisible(true);
                }
            });
        }
    }

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
                    } else if (route.name === 'Task') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'clipboard-text-outline' : 'clipboard-text-outline'}
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
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    backgroundColor: COLOR.BACKGROUNDCOLOR,
                },

                tabBarLabelStyle: { fontSize: 14, textTransform: KEY.CAPITALIZE },
                tabBarHideOnKeyboard: true,
                headerTintColor: COLOR.BACKGROUNDCOLOR
            })}
            backBehavior="initialRoute"
        >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
            {
                taskVisible &&
                <Tab.Screen name="Task" component={TaskStackScreen} options={{ headerShown: false }} />
            }
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