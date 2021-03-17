import React from 'react'
import { View, StyleSheet } from 'react-native'
import CustomListItem from '../../../components/custom-list-item'
import constants from '../../../constants';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function DropOrder(props) {
    return (
        <View style={styles.container}>
            <CustomListItem
                title={'Scan'}
                onPress={() => props.navigation.navigate('Drop By Scan Barcode')}
                left={() => <Ionicons name="scan-sharp" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={24} color={constants.COLORS.MAIN} />}
            />
            <CustomListItem
                title={'Enter Order ID'}
                onPress={() => props.navigation.navigate('Drop By ID')}
                left={() => <FontAwesome5 name="orcid" style={{ display: 'flex', alignSelf: 'center', margin: 15 }} size={28} color={constants.COLORS.MAIN} />}
            />
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