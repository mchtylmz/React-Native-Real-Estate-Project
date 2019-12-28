import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import DrawerContent from '@Component/Menu/Left';

import PublicIntro from '@Screen/Public/Intro';
import PublicHome from '@Screen/Public/Home';
import PublicProperties from '@Screen/Public/Properties';
import SearchDetail from '@Screen/Public/SearchDetail';
import PublicPropertySearch from '@Screen/Public/PropertySearch';
import PublicPropertyDetail from '@Screen/Public/PropertyDetail';
import PublicAgents from '@Screen/Public/Agents';
import PublicAgentDetail from '@Screen/Public/AgentDetail';
import PublicAboutUs from '@Screen/Public/AboutUs';
import PublicContact from '@Screen/Public/Contact';

import MemberSignUp from '@Screen/Member/SignUp';
import MemberSignIn from '@Screen/Member/SignIn';
import MemberHome from '@Screen/Member/Home';
import MemberProperties from '@Screen/Member/Properties';
import MemberPropertyAdd from '@Screen/Member/PropertyAdd';
import MemberPropertyAddLocation from '@Screen/Member/PropertyAdd/Location';
import MemberPropertyAddAmenities from '@Screen/Member/PropertyAdd/Amenities';
import MemberPropertyAddPhotos from '@Screen/Member/PropertyAdd/Photos';
import MemberPropertyAddPublished from '@Screen/Member/PropertyAdd/Published';
import MemberProfile from '@Screen/Member/Profile';
import MemberSettings from '@Screen/Member/Settings';
import MemberFavorites from '@Screen/Member/Favorites';
import MemberMessages from '@Screen/Member/Messages';

const deviceWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator(
  {
    PublicHome: {
      screen: PublicHome,
    },
    MemberHome: {
      screen: MemberHome,
    },
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    headerMode: 'none',
    initialRouteName: 'PublicHome',
    drawerWidth: deviceWidth - 50,
  },
);

const App = createStackNavigator(
  {
    PublicIntro: {
      screen: PublicIntro,
    },
    PublicProperties: {
      screen: PublicProperties,
    },
    SearchDetail: {
      screen: SearchDetail,
    },
    PublicPropertySearch: {
      screen: PublicPropertySearch,
    },
    PublicPropertyDetail: {
      screen: PublicPropertyDetail,
    },
    PublicAgents: {
      screen: PublicAgents,
    },
    PublicAgentDetail: {
      screen: PublicAgentDetail,
    },
    PublicAboutUs: {
      screen: PublicAboutUs,
    },
    PublicContact: {
      screen: PublicContact,
    },

    MemberSignUp: {
      screen: MemberSignUp,
    },
    MemberSignIn: {
      screen: MemberSignIn,
    },
    MemberMessages: {
      screen: MemberMessages,
    },
    MemberProperties: {
      screen: MemberProperties,
    },
    MemberPropertyAdd: {
      screen: MemberPropertyAdd,
    },
    MemberPropertyAddLocation: {
      screen: MemberPropertyAddLocation,
    },
    MemberPropertyAddAmenities: {
      screen: MemberPropertyAddAmenities,
    },
    MemberPropertyAddPhotos: {
      screen: MemberPropertyAddPhotos,
    },
    MemberPropertyAddPublished: {
      screen: MemberPropertyAddPublished,
    },
    MemberProfile: {
      screen: MemberProfile,
    },
    MemberSettings: {
      screen: MemberSettings,
    },
    MemberFavorites: {
      screen: MemberFavorites,
    },

    Drawer: {
      screen: Drawer,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Drawer',
  },
);

const AppContainer = createAppContainer(App);

export default AppContainer;
