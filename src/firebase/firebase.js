import firebase from '@react-native-firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyDoy7j0tL8iGnm_3lSV3UaDSj58bmUFi-g",
	authDomain: "membroz-44bf7.firebaseapp.com",
	databaseURL: "https://membroz-44bf7.firebaseio.com",
	projectId: "membroz-44bf7",
	storageBucket: "membroz-44bf7.appspot.com",
	messagingSenderId: "24932558592",
	appId: "1:24932558592:web:e69812a6b2f0f4b52df5e5"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
