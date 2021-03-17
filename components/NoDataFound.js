import React from 'react'
import { View, Text } from 'react-native'

export default function NoDataFound() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
            <Text>{'No Data Found'}</Text>
        </View>
    )
}
