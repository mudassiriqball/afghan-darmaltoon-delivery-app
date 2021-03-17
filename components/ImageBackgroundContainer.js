import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image } from "react-native";
import TransparentStatusBar from '../components/TransparentStatusBar'
import STATUSBAR_HEIGHT from '../components/StatusBarHeight';
import Constants from '../constants';

export default function ImageBackgroundContainer(props) {
    return (
        <ImageBackground source={require('../assets/splash.png')} style={{ flex: 1, justifyContent: 'center', paddingTop: STATUSBAR_HEIGHT }}>
            <TransparentStatusBar />
            <Text style={styles.welcome}>{props.title} to Al-Makan </Text>
            <View style={styles.container}>
                <Image style={{ alignSelf: 'center', margin: 20, width: 150, height: 150 }}
                    source={require('../assets/icon.png')} />
                {props.children}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // opacity: 0.8,
        flex: 1,
        backgroundColor: Constants.COLORS.WHITE,
        borderTopLeftRadius: 50,
        padding: Constants.SIZES.BASE * 2,
        marginLeft: 15,
        shadowColor: Constants.COLORS.TEXT,
        shadowRadius: 6,
        shadowOffset: { width: -5, height: -5 },
        shadowOpacity: 0.5,
        elevation: 2,
    },
    welcome: {
        marginBottom: 30,
        marginTop: 30,
        color: Constants.COLORS.TEXT,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25,
        opacity: 0.8,
    },
})