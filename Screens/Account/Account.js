import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomListItem from '../../components/custom-list-item'
import constants from '../../constants';
import * as Linking from 'expo-linking';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

export default function Account(props) {
    return (
        <View style={styles.container}>
            {props.user && props.user.role === '' ?
                <>
                    <View style={{ backgroundColor: constants.COLORS.MAIN }}>
                        <View style={{ display: 'flex', marginLeft: 20, alignItems: 'flex-start', paddingVertical: 30 }}>
                            <Entypo name="user" size={80} color={constants.COLORS.TEXT} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: constants.SIZES.BASE * 2, marginTop: 10 }}>
                        <CustomListItem
                            title={'Login'}
                            onPress={() => props.navigation.navigate('Login')}
                            left={() => <AntDesign name="login" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={25} color={constants.COLORS.MAIN} />}
                        />
                        <CustomListItem
                            title={'Signup'}
                            onPress={() => Linking.openURL('https://afghandarmaltoon.herokuapp.com/signup')}
                            left={() => <Entypo name="add-user" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={25} color={constants.COLORS.MAIN} />}
                        />
                    </View>
                </>
                :
                <View style={{ backgroundColor: constants.COLORS.MAIN, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, paddingVertical: 30 }}>
                        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {props.user.avatar ?
                                <Avatar.Image size={80} source={{ uri: props.user.avatar }} />
                                :
                                <Entypo name="user" size={80} color={constants.COLORS.TEXT} />
                            }
                        </View>
                        <View style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: constants.COLORS.TEXT, fontWeight: 'bold' }}>{props.user.fullName}</Text>
                            <Text style={{ fontSize: 13, color: constants.COLORS.TEXT, fontWeight: 'bold' }}>{props.user.mobile}</Text>
                        </View>
                    </View>
                </View>
            }
            <View style={{ paddingHorizontal: constants.SIZES.BASE * 2 }}>
                <CustomListItem
                    title={'Privacy Policy'}
                    onPress={() => Linking.openURL('https://afghandarmaltoon.herokuapp.com/terms-and-conditions')}
                    left={() => <MaterialIcons name="privacy-tip" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={28} color={constants.COLORS.MAIN} />}
                />
                <CustomListItem
                    title={'About Us'}
                    onPress={() => Linking.openURL('https://afghandarmaltoon.herokuapp.com/about-us')}
                    left={() => <Entypo name="info-with-circle" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={25} color={constants.COLORS.MAIN} />}
                />
                {props.user && props.user.role !== '' &&
                    <CustomListItem
                        title={'Logout'}
                        onPress={props.logout}
                        left={() => <AntDesign name="logout" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={23} color={constants.COLORS.MAIN} />}
                    />
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.WHITE,
        // padding: constants.SIZES.BASE * 2
    },
});