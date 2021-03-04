import Blogs from './Blogs';
import Post from './Post';
import Edit from './Edit';

import {
  StyleSheet,
  backgroundColor,
  ImageBackground,
  ImageStyle,
  Image,
  image,
} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createAppContainer} from 'react-navigation';

const NavStack = createStackNavigator({
  Blogs: {
    screen: Blogs,
    navigationOptions: {
      headerShown: false,

      cardStyle: {
        shadowColor: 'transparent',
        backgroundColor: 'transparent',
      },
      transparentCard: true,
      transitionConfig: () => ({
        containerStyle: {
          backgroundColor: 'transparent',
        },
      }),
    },
  },

  Edit: {
    screen: Edit,
    navigationOptions: () => ({
      headerTitle: 'Edit your text',
      headerShown: false,
    }),
  },
});

const BottomTab = createBottomTabNavigator({
  NavStack: {
    screen: NavStack,
  },
  Post: {
    screen: Post,
  },
});

export default Routes = createAppContainer(BottomTab);
