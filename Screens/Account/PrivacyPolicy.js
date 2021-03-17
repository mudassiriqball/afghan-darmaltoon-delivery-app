import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import constants from '../../constants';

export default function PrivacyPolicy() {
    return (
        <View style={styles.container}>
            <Text>PrivacyPolicy</Text>
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