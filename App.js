import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;