import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Constants from '../constants'

export default function CustomButton(props) {
    return (
        <Button
            style={styles.button}
            color={Constants.COLORS.WHITE}
            labelStyle={{ color: props.disabled ? 'lightgray' : Constants.COLORS.WHITE }}
            {...props}
        >{props.title}</Button>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Constants.COLORS.MAIN,
        width: '100%',
        marginVertical: 5,
        paddingVertical: 5
    },
})