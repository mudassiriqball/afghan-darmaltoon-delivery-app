import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import constants from '../../../constants';
import CustomButton from '../../../components/custom-button';
import CustomTextField from '../../../components/custom-text-field';
import Loading from '../../../components/Loading';
import SearchOrderForPickDelivery from '../../../hooks/SearchOrderForPickDelivery';
import NoDataFound from '../../../components/NoDataFound';
import axios from 'axios';
import urls from '../../../utils/urls';

export default function PickById(props) {
    const { user, token } = props;
    const [searchVal, setsearchVal] = useState('');
    const [_id, set_id] = useState(null);
    const [loading, setloading] = useState(false);

    const { ORDER_LOADING, ORDER_ERROR, ORDER_DATA, } = SearchOrderForPickDelivery(_id, token);

    const confirmPickOrder = async () => {
        setloading(true);
        axios({
            method: 'POST',
            url: urls.POST_REQUEST.PICK_ORDER,
            headers: {
                'authorization': token
            },
            params: { order_id: ORDER_DATA._id, delivery_boy_id: user._id }
        }).then(res => {
            setloading(false);
            if (res.data.code == 200) {
                Alert.alert(
                    "Success",
                    "Order successfully added to your orders list.",
                    [
                        { text: "OK", onPress: () => { props.navigation.navigate('Home') } }
                    ],
                    { cancelable: false }
                );
                sendSms();
            } else {
                Alert.alert(
                    "Error",
                    `Sorry this order can\'t be deliver, Order status is ${res.data.message}`,
                    [
                        { text: "OK", onPress: () => { props.navigation.goBack() } }
                    ],
                    { cancelable: false }
                );
            }
        }).catch(err => {
            setloading(false);
            Alert.alert(
                "Error",
                `Something went wrong, Please try again later`,
                [
                    { text: "OK", onPress: () => { props.navigation.goBack() } }
                ],
                { cancelable: false }
            );
            console.log('confirmPickOrder Error:', err);
        })
    }

    const sendSms = async () => {
        await axios.post(urls.POST_REQUEST.SEND_ORDER_STATUS_CHANGED_SMS,
            {
                to: ORDER_DATA.mobile,
                body: `Welcome to Afghan Darmaltoon! Your order status updated from pending to processing and your order on it's way.\nOrder ID: ${ORDER_DATA._id}\nPlaced on: ${ORDER_DATA.entry_date.substring(0, 10)}\nPlaease contact to admin for more details\n+92 313-9573389\nafghandarmaltoon@gmail.com`
            }).then(function (res) {
                console.log('smd sended')
            }).catch(function (err) {
                console.log('send sms failed:', err)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 30 }}>{'Enter the order ID, ten press Done button '}</Text>
            <CustomTextField
                value={searchVal}
                label={"Order ID"}
                onChangeText={setsearchVal}
                placeholder={'Enter order ID'}
            />
            {ORDER_LOADING ?
                <Loading />
                :
                ORDER_DATA && ORDER_DATA !== '' ?
                    <View style={{ flex: 1 }}>
                        <Text>{'Order ID'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA._id}</Text>

                        <Text style={{ marginTop: 20 }}>{'Placed On'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA.entry_date.substring(0, 10)}</Text>

                        <Text style={{ marginTop: 20 }}>{'Sub Total'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA.sub_total}</Text>

                        <Text style={{ marginTop: 20 }}>{'Customer Name'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA.c_name}</Text>

                        <Text style={{ marginTop: 20 }}>{'Shpping Address'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA.address}</Text>

                        <Text style={{ marginTop: 20 }}>{'Mobile'}</Text>
                        <Text>{ORDER_DATA && ORDER_DATA.mobile}</Text>
                    </View>
                    :
                    <NoDataFound />
            }
            {searchVal !== '' && < CustomButton title={'Search'} disabled={loading || ORDER_LOADING} loading={ORDER_LOADING} onPress={() => set_id(searchVal)} />}

            {searchVal !== '' && _id !== '' && !ORDER_LOADING && ORDER_DATA && ORDER_DATA !== null &&
                < CustomButton title={'Confirm Pick Order'} disabled={loading || ORDER_LOADING} loading={loading} onPress={confirmPickOrder} />
            }
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
