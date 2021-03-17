import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import moment from 'moment';
import constants from '../../constants';
import urls from '../../utils/urls';

const width = Dimensions.get('window').width;

export default function ViewOrder(props) {
    const { orderData } = props.route.params;
    const { user, token } = props;

    const [products, setProducts] = useState('');

    useEffect(() => {
        orderData && orderData.products && orderData.products.forEach((element, index) => {
            getData(element.p_id);
        });
        return () => { }
    }, [])

    async function getData(id) {
        await axios.get(urls.GET_REQUEST.GET_PRODUCT_BY_ID + id).then((res) => {
            setProducts(prevOrders => {
                return [...new Set([...prevOrders, ...res.data.data])]
            })
        }).catch((err) => {
            console.log('Get product error:', err)
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Card>
                {orderData.status === 'progress' &&
                    <View >
                        <Card.Title title={'Receive Order Code'} subtitle={orderData.code} />
                        <Card.Content style={{ alignItems: 'center', marginBottom: 20 }}>
                            <QRCode
                                value={orderData.code}
                                size={width - (constants.SIZES.BASE * 10)}
                                backgroundColor='#FFFFFF'
                                color='#000000'
                            />
                        </Card.Content>
                    </View>
                }
                <Card.Title title={'Order Information'} subtitle={'ID: ' + orderData._id} />
                <Card.Content>
                    <View style={styles.cardBody}>
                        <Text style={{ flex: 1 }}>{'Status: '}</Text>
                        <Text style={{ flex: 1 }}>{orderData.status}</Text>
                    </View>
                    <View style={[styles.cardBody, { marginTop: 20 }]}>
                        <Text style={{ flex: 1 }}>{'Sub Total: '}</Text>
                        <Text style={{ flex: 1 }}>{orderData.sub_total}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={{ flex: 1 }}>{'Shipping Charges: '}</Text>
                        <Text style={{ flex: 1 }}>{orderData.shippingCharges}</Text>
                    </View>
                    <View style={{ borderBottomColor: constants.COLORS.BORDER, borderBottomWidth: 1, marginTop: 10, marginBottom: 5 }} />
                    <View style={styles.cardBody}>
                        <Text style={{ flex: 1 }}>{'Total: '}</Text>
                        <Text style={{ flex: 1 }}>{parseInt(orderData.sub_total) + parseInt(orderData.shippingCharges)}</Text>
                    </View>
                </Card.Content>
                <Card.Title title={'Products Information'} />
                <Card.Content>
                    {products !== '' && products.map((element, index) =>
                        <View key={index}>
                            <View style={styles.cardBody}>
                                <Text style={{ flex: 1 }}>{'Name: '}</Text>
                                <Text style={{ flex: 1 }}>{element.name}</Text>
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={{ flex: 1 }}>{'Quantity: '}</Text>
                                <Text style={{ flex: 1 }}>{orderData.products[index].quantity}</Text>
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={{ flex: 1 }}>{'Product Id: '}</Text>
                                <Text style={{ flex: 1 }}>{orderData.products[index].p_id}</Text>
                            </View>
                        </View>
                    )}
                </Card.Content>
            </Card>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: constants.COLORS.WHITE,
        padding: constants.SIZES.BASE * 2
    },
    itemView: {
        marginBottom: 10
    },
    cardBody: {
        flexDirection: 'row',
        marginVertical: 5
    },
})