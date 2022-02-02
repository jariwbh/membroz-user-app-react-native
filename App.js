import React from 'react'
import NavigationApp from './src/navigations/navigation'
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import * as COLOR from './src/styles/colors';

const App = () => {
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
