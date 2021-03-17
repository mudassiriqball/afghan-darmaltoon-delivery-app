import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { getDecodedTokenFromStorage, getTokenFromStorage, removeTokenFromStorage } from './utils/services/auth';
import Login from './Screens/Account/Login';
import AboutUs from './Screens/Account/AboutUs';
import PrivacyPolicy from './Screens/Account/PrivacyPolicy';
import constants from './constants';
import PickOrder from './Screens/Delivery/Pick/PickOrder';
import DropOrder from './Screens/Delivery/Drop/DropOrder';
import PickByScan from './Screens/Delivery/Pick/PickByScan';
import PickById from './Screens/Delivery/Pick/PickById';
import DropById from './Screens/Delivery/Drop/DropById';
import DropByScan from './Screens/Delivery/Drop/DropByScan';
import CustomerOrders from './Screens/Customer/CustomerOrders';
import DeliverBoyOrders from './Screens/Delivery/DeliverBoyOrders';
import urls from './utils/urls';
import Constants from './constants';
import ViewOrder from './Screens/Customer/ViewOrder';

LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createStackNavigator();
  // User
  const [user, setUser] = useState({ _id: '', fullName: '', mobile: '', city: '', licenseNo: '', address: '', email: '', status: '', role: '', wishList: '', cart: '', entry_date: '' })
  const [token, setToken] = useState('');
  useEffect(() => {
    getUserFromStorage();
    return () => { }
  }, []);

  const getUserFromStorage = async () => {
    const decodedToken = await getDecodedTokenFromStorage();
    if (decodedToken !== null) {
      setUser(decodedToken);
      getUser(decodedToken._id);
      const _token = await getTokenFromStorage();
      if (_token !== null)
        setToken(_token);
    }
  }

  const getUser = async (id) => {
    await axios.get(urls.GET_REQUEST.USER_BY_ID + id).then((res) => {
      setUser(res.data.data[0]);
    }).catch((err) => {
      console.log('Get user err in profile', err);
    })
  }

  const logout = () => {
    if (removeTokenFromStorage()) {
      setUser({ _id: '', fullName: '', mobile: '', city: '', licenseNo: '', address: '', email: '', status: '', role: '', wishList: '', cart: '', entry_date: '' })
      setToken('');
    }
  }
  // End of User

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={constants.COLORS.MAIN} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Constants.COLORS.MAIN },
          headerTintColor: Constants.COLORS.WHITE,
          headerTitleAlign: 'center',
        }}
      >
        {/* Home , Categories, Cart , Account */}
        <Stack.Screen name="Root" options={{ headerShown: false }}>
          {props =>
            <BottomTabNavigator {...props}
              user={user}
              token={token}
              reloadUser={() => getUser(user._id)}
              logout={logout}
            />
          }
        </Stack.Screen>

        {/* Login */}
        <Stack.Screen name="Login">{props => <Login {...props} reloadUser={getUserFromStorage} />}</Stack.Screen>

        {/* Pick Order */}
        <Stack.Screen name="Pick Order">{props => <PickOrder user={user} token={token} {...props} />}</Stack.Screen>
        <Stack.Screen name="Pick By Scan Barcode">{props => <PickByScan user={user} token={token} {...props} />}</Stack.Screen>
        <Stack.Screen name="Pick By ID">{props => <PickById user={user} token={token}{...props} />}</Stack.Screen>

        {/* Drop Order */}
        <Stack.Screen name="Drop Order">{props => <DropOrder user={user} token={token} {...props} />}</Stack.Screen>
        <Stack.Screen name="Drop By Scan Barcode">{props => <DropByScan user={user} token={token} {...props} />}</Stack.Screen>
        <Stack.Screen name="Drop By ID">{props => <DropById user={user} token={token} {...props} />}</Stack.Screen>

        {/* Delivery Boy Orders*/}
        <Stack.Screen name="DeliverBoyOrders">{props => <DeliverBoyOrders user={user} token={token}{...props} />}</Stack.Screen>

        {/* CUstomers Orders */}
        <Stack.Screen name="CustomerOrders">{props => <CustomerOrders user={user} token={token}{...props} />}</Stack.Screen>
        <Stack.Screen name="View Order">{props => <ViewOrder user={user} token={token}{...props} />}</Stack.Screen>

        {/* Privacy Policy */}
        <Stack.Screen name="Privacy Policy">{props => <PrivacyPolicy {...props} />}</Stack.Screen>

        {/* About Us */}
        <Stack.Screen name="About Us">{props => <AboutUs {...props} />}</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
