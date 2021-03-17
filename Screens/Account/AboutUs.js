import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import constants from '../../constants';

export default function AboutUs() {
    return (
        <View style={styles.container}>
            <Text>AboutUs</Text>
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