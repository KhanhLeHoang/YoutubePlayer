import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import color from './app/misc/color';
import { Provider } from 'react-redux';
import { Store } from './app/redux/store';
import { navigationRef } from './app/RootNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.APP_BG,
  },
};

export default function App() {
  return (
    <Provider store={Store}>
      <AudioProvider>
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}
