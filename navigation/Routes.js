import React, {useContext, useState, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {View, ActivityIndicator} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {DrawerContent} from '../screens2/DrawerContent';

import MainTabScreen from '../screens2/MainTabScreen';
import SupportScreen from '../screens2/SupportScreen';
import SettingsScreen from '../screens2/SettingsScreen';
import BookmarkScreen from '../screens2/BookmarkScreen';

import RootStackScreen from '../screens2/RootStackScreen';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#c4ae66',
    text: '#e3d9b6',
  },
};

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: 'red',
  },
};

const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
const [isDarkTheme, setIsDarkTheme] = React.useState(false);

const Routes = () => {
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Provider store={state}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {user ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default Routes;
