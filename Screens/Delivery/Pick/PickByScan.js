import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import constants from '../../../constants';
import CustomButton from '../../../components/custom-button';
import Loading from '../../../components/Loading';
import SearchOrderForPickDelivery from '../../../hooks/SearchOrderForPickDelivery';
import NoDataFound from '../../../components/NoDataFound';
import axios from 'axios';
import urls from '../../../utils/urls';


const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function PickByScan(props) {
    const { user, token } = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [_id, set_id] = useState(null);
    const [loading, setloading] = useState(false);

    const { ORDER_LOADING, ORDER_ERROR, ORDER_DATA } = SearchOrderForPickDelivery(_id, token);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult) => {
        if (!scanned) {
            const { type, data, bounds: { origin } = {} } = scanningResult;
            const { x, y } = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                set_id(data);
                console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

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
                sendSms();
                Alert.alert(
                    "Success",
                    "Order successfully added to your orders list.",
                    [
                        { text: "OK", onPress: () => { props.navigation.navigate('Home') } }
                    ],
                    { cancelable: false }
                );
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
                debugger
                console.log('send sms failed:', err)
            })
    }

    return (
        <View style={styles.container}>
            {!scanned ?
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                >
                    <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
                </BarCodeScanner>
                :
                ORDER_LOADING ?
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
            {scanned && <CustomButton title={'Scan Again'} disabled={loading || ORDER_LOADING} loading={ORDER_LOADING} onPress={() => { setScanned(false), set_id(null) }} />}
            {!ORDER_LOADING && ORDER_DATA && ORDER_DATA !== null &&
                < CustomButton title={'Confirm Pick Order'} disabled={loading || ORDER_LOADING} loading={loading} onPress={confirmPickOrder} />
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.WHITE,
        padding: constants.SIZES.BASE * 2
    },
});
