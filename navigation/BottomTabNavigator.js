import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Constants from '../constants';
import Home from '../Screens/Home';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Account from '../Screens/Account/Account';

const Stack = createStackNavigator();

export default function BottomTabNavigator(props) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Constants.COLORS.WHITE,
        tabStyle: { paddingVertical: 5 },
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        activeBackgroundColor: Constants.COLORS.MAIN
      }}
    >
      {/* Home */}
      <BottomTab.Screen name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <AntDesign style={{}} name="home" size={20} color={focused ? Constants.COLORS.WHITE : Constants.COLORS.TEXT} />,
        }}
      >
        {prop => <HomeStack {...props} />}
      </BottomTab.Screen>

      {/* Account */}
      <BottomTab.Screen name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <Entypo name="user" size={20} color={focused ? Constants.COLORS.WHITE : Constants.COLORS.TEXT} />,
        }}
      >
        {prop => <AccountStack {...props} />}
      </BottomTab.Screen>

    </BottomTab.Navigator>
  );
}

const HomeStack = props => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: Constants.COLORS.MAIN },
        headerTintColor: Constants.COLORS.WHITE,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Home">
        {() =>
          <Home {...props} />
        }
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const AccountStack = props => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: Constants.COLORS.MAIN },
        headerTintColor: Constants.COLORS.WHITE,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Account">
        {() =>
          <Account {...props} />
        }
      </Stack.Screen>
    </Stack.Navigator>
  )
}
