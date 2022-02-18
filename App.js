import changeNavigationBarColor from 'react-native-navigation-bar-color';
import NavigationApp from './src/navigations/navigation';
import * as COLOR from './src/styles/colors';
import React from 'react';

const App = () => {

  //SET BOTTOM TAB NAVIGATION
  AppBottomNavigationColor();
  return (
    <NavigationApp />
  )
}

const AppBottomNavigationColor = async () => {
  try {
    const response = await changeNavigationBarColor(COLOR.BLACK);
    console.log(response)// {success: true}
  } catch (e) {
    console.log(e)// {success: false}
  }
};

export default App;
