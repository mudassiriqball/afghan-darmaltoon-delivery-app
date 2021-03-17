import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import OrderCard from '../../components/OrderCard';
import constants from '../../constants';
import getCustomersOrdersPageLimit from '../../hooks/getCustomersOrdersPageLimit';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function CustomerOrders(props) {
    const { status } = props.route.params;
    const { user, token } = props;
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [refresh_count, setRefresh_count] = useState(0);

    const { CUSTOMER_ORDERS_LOADING, CUSTOMER_ORDERS_HASMORE, CUSTOMER_ORDERS } = getCustomersOrdersPageLimit(refresh_count, user._id, token, status, page, '10');

    useEffect(() => {
        props.navigation.setOptions({
            title: status == 'pending' ?
                'Pending Orders'
                :
                status == 'delivered' ?
                    'Delivered Orders'
                    :
                    status == 'progress' ?
                        'In Progress Orders'
                        :
                        status == 'cancelled' ?
                            'Cancelled Orders'
                            :
                            'Orders'
        })
        return () => { }
    }, []);

    function handleLoadMore() {
        if (CUSTOMER_ORDERS_HASMORE) {
            setTimeout(() => {
                setPage(page + 1)
            }, 500);
        }
    }

    function renderItem({ item }) {
        return (
            <View style={{ width: '100%' }}>
                <OrderCard isDeliveryOrder={false} item={item} {...props} />
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
            {CUSTOMER_ORDERS && CUSTOMER_ORDERS.length > 0 ?
                <FlatList
                    data={CUSTOMER_ORDERS}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    initialNumToRender={3}
                    ListFooterComponent={() => {
                        return (
                            CUSTOMER_ORDERS_LOADING && <Loading />
                        );
                    }}
                    onEndReached={handleLoadMore}
                    onEndThreshold={0}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
                :
                CUSTOMER_ORDERS_LOADING ?
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