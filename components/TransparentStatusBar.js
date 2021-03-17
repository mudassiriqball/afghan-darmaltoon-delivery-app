import React from 'react'
import { StatusBar } from 'react-native'

export default function TransparentStatusBar() {
    return (
        <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'rgba(0,0,0,0)'} />
    )
}
