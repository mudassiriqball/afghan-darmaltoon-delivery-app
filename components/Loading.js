import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Constants from '../constants'

export default function Loading() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
            <ActivityIndicator size="large" color={Constants.COLORS.MAIN} />
        </View>
    )
}
