import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import OrderCard from '../../components/OrderCard';
import constants from '../../constants';
import getDeliveryBoyOrdersPageLimit from '../../hooks/getDeliveryBoyOrdersPageLimit';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function DeliveryBoyOrders(props) {
    const { status } = props.route.params;
    const [refreshing, setRefreshing] = useState(false);
    const { user, token } = props;
    const [page, setPage] = useState(1);
    const [refresh_count, setRefresh_count] = useState(0);
    const { DELIVERY_BOY_ORDERS_LOADING, DELIVERY_BOY_ORDERS_HASMORE, DELIVERY_BOY_ORDERS } = getDeliveryBoyOrdersPageLimit(refresh_count, user._id, token, status, page, '10');

    useEffect(() => {
        props.navigation.setOptions({
            title: status == 'delivered' ?
                'Delivered Orders'
                :
                status == 'progress' ?
                    'In Progress Orders'
                    :
                    'Orders'
        })
        return () => {
        }
    }, []);

    function handleLoadMore() {
        if (DELIVERY_BOY_ORDERS_HASMORE) {
            setTimeout(() => {
                setPage(page + 1)
            }, 500);
        }
    }

    function renderItem({ item }) {
        return (
            <View style={{ width: '100%' }}>
                <OrderCard isDeliveryOrder={true} item={item} {...props} />
            </View>
        )
    }

    // Refresh Page
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {
            setRefreshing(false);
            setRefresh_count(refresh_count + 1);
            setPage(1);
        });
    }, []);

    return (
        <View style={styles.container}>
            {DELIVERY_BOY_ORDERS && DELIVERY_BOY_ORDERS.length > 0 ?
                <FlatList
                    data={DELIVERY_BOY_ORDERS}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    initialNumToRender={3}
                    ListFooterComponent={() => {
                        return (
                            DELIVERY_BOY_ORDERS_LOADING && <Loading />
                        );
                    }}
                    onEndReached={handleLoadMore}
                    onEndThreshold={0}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
                :
                DELIVERY_BOY_ORDERS_LOADING ?
                    <Loading />
                    :
                    <NoDataFound />
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