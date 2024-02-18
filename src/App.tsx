import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {enableScreens} from 'react-native-screens';

import {Provider as StoreProvider} from 'react-redux';
import {
  NavigationContainer,
  DarkTheme as DarkNavigationTheme,
  DefaultTheme as DefaultNavigationTheme,
} from '@react-navigation/native';
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {store} from './store';
import {HomeBottomTab} from './screens/HomeBottomTab';
import {darkTheme, lightTheme} from './colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

enableScreens(true);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const paperLightTheme = {
    ...MD3LightTheme,
    colors: lightTheme.colors,
  };

  const paperDarkTheme = {
    ...MD3DarkTheme,
    colors: darkTheme.colors,
  };

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: DefaultNavigationTheme,
    reactNavigationDark: DarkNavigationTheme,
    materialLight: paperLightTheme,
    materialDark: paperDarkTheme,
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider store={store}>
        <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
          <PaperProvider theme={isDarkMode ? paperDarkTheme : paperLightTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={
                isDarkMode ? DarkTheme.colors.card : LightTheme.colors.card
              }
            />
            <HomeBottomTab />
          </PaperProvider>
        </NavigationContainer>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default App;
