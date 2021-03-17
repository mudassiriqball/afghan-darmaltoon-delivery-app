import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import constants from '../constants';
import CustomButton from './custom-button';
import SearchOrderForPickDelivery from '../hooks/SearchOrderForPickDelivery'

export default function OrderCard(props) {
    const { item, isDeliveryOrder, token } = props;

    const { ORDER_LOADING, ORDER_ERROR, ORDER_DATA } = SearchOrderForPickDelivery(isDeliveryOrder ? item.order_id : item._id, token);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.itemView}>
                <Card>
                    {isDeliveryOrder ?
                        <>
                            <Card.Title title={'Order ID: '} subtitle={item._id} />
                            <Card.Content>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Status: '}</Text>
                                    <Text style={{ flex: 1 }}>{item.status}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Payment Option: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.paymentType == 'cash' ? "Cash on Delivery" : 'Online'}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Sub Total: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.sub_total}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Shipping Charges: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.shippingCharges}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Total: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && (parseInt(ORDER_DATA.shippingCharges) + parseInt(ORDER_DATA.sub_total))}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Entry Date: '}</Text>
                                    <Text style={{ flex: 1 }}>{item.entry_date && item.entry_date.substring(0, 10)}</Text>
                                </View>

                                <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>{'Order Information'}</Text>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Mobile: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.mobile}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Full Name: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.c_name}</Text>
                                </View>
                                <View style={[styles.cardBody, { marginBottom: 20 }]}>
                                    <Text style={{ flex: 1 }}>{'Address: '}</Text>
                                    <Text style={{ flex: 1 }}>{ORDER_DATA && ORDER_DATA.address}</Text>
                                </View>
                            </Card.Content>
                        </>
                        :
                        <>
                            <Card.Title title={'Order ID: '} subtitle={item._id} />
                            <Card.Content>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Status: '}</Text>
                                    <Text style={{ flex: 1 }}>{item.status}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Sub Total: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && item.sub_total}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Shipping Charges: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && item.shippingCharges}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Total: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && (parseInt(item.shippingCharges) + parseInt(item.sub_total))}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Entry Date: '}</Text>
                                    <Text style={{ flex: 1 }}>{item.entry_date && item.entry_date.substring(0, 10)}</Text>
                                </View>

                                <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>{'Order Information'}</Text>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Mobile: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && item.mobile}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={{ flex: 1 }}>{'Full Name: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && item.c_name}</Text>
                                </View>
                                <View style={[styles.cardBody, { marginBottom: 20 }]}>
                                    <Text style={{ flex: 1 }}>{'Address: '}</Text>
                                    <Text style={{ flex: 1 }}>{item && item.address}</Text>
                                </View>
                            </Card.Content>
                        </>
                    }
                    {!isDeliveryOrder && <Card.Actions>
                        <CustomButton
                            block
                            size={'small'}
                            title={'View'}
                            onPress={() => props.navigation.navigate('View Order', { orderData: item })}
                        />
                    </Card.Actions>}
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itemView: {
        marginBottom: 10,
        borderColor: constants.COLORS.MAIN,
        borderRadius: 5,
        borderWidth: 1,
    },
    cardBody: {
        flexDirection: 'row',
        marginVertical: 5
    },
})
