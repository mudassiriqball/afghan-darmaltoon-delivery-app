import React from 'react'
import { View, StyleSheet, Text, Animated, Easing } from 'react-native'
import CustomListItem from '../components/custom-list-item'
import constants from '../constants';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function CustomerDashboard(props) {
    const spinValue = new Animated.Value(0);
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    return (
        <View style={styles.container}>
            {props.user && props.user.role === 'delivery' ?
                <>
                    <CustomListItem
                        title={'Pick Order'}
                        onPress={() => props.navigation.navigate('Pick Order')}
                        left={() => <FontAwesome5 name="box-open" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={20} color={constants.COLORS.MAIN} />}
                    />
                    <CustomListItem
                        title={'Drop Order'}
                        onPress={() => props.navigation.navigate('Drop Order')}
                        left={() => <MaterialIcons name="delivery-dining" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={32} color={constants.COLORS.MAIN} />}
                    />
                    <CustomListItem
                        title={'In Progress Orders'}
                        onPress={() => props.navigation.navigate('DeliverBoyOrders', { status: 'progress' })}
                        left={() => <MaterialCommunityIcons name="progress-clock" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={28} color={constants.COLORS.MAIN} />}
                    />
                    <CustomListItem
                        title={'Delivered Orders'}
                        onPress={() => props.navigation.navigate('DeliverBoyOrders', { status: 'delivered' })}
                        left={() => <AntDesign name="checkcircleo" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={24} color={constants.COLORS.MAIN} />}
                    />
                </>
                :
                props.user && props.user.role === 'customer' ?
                    <>
                        <CustomListItem
                            title={'Pending Orders'}
                            onPress={() => props.navigation.navigate('CustomerOrders', { status: 'pending' })}
                            left={() => <MaterialIcons name="pending-actions" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={29} color={constants.COLORS.MAIN} />}
                        />
                        <CustomListItem
                            title={'In Progress Orders'}
                            onPress={() => props.navigation.navigate('CustomerOrders', { status: 'progress' })}
                            left={() => <MaterialCommunityIcons name="progress-clock" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={28} color={constants.COLORS.MAIN} />}
                        />
                        <CustomListItem
                            title={'Delivered Orders'}
                            onPress={() => props.navigation.navigate('CustomerOrders', { status: 'delivered' })}
                            left={() => <AntDesign name="checkcircleo" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={24} color={constants.COLORS.MAIN} />}
                        />
                        <CustomListItem
                            title={'Cancelled Orders'}
                            onPress={() => props.navigation.navigate('CustomerOrders', { status: 'cancelled' })}
                            left={() => <AntDesign name="closecircleo" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={24} color={constants.COLORS.MAIN} />}
                        />
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, textAlign: 'center' }}>Welcome To </Text>
                        <Text style={{ fontSize: 30, textAlign: 'center' }}>Afghan Darmaltoon</Text>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Mobile App</Text>
                        {/* <Animated.View style={{ transform: [{ rotate: spin }], width: 20, height: 20, backgroundColor: 'red' }} /> */}
                        <Animated.Image style={{ transform: [{ rotate: spin }] }} source={require('../assets/icon.png')} />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.WHITE,
        padding: constants.SIZES.BASE * 2
    },
});