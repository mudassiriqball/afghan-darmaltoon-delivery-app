import React from 'react'
import { Text } from 'react-native'
import Constants from '../constants'

export default function FieldErrorText(props) {
    return (
        <Text style={{ color: Constants.COLORS.ERROR, marginBottom: 8, marginTop: 3 }}>
            {props.children}
        </Text>
    )
}
