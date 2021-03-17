import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urls from '../utils/urls';

export default function getDeliveryBoyOrdersPageLimit(refresh_count, _id, token, status, page, limit) {
    const [DELIVERY_BOY_ORDERS_LOADING, setLoading] = useState(false);
    const [DELIVERY_BOY_ORDERS_HASMORE, setHasMore] = useState(false);
    const [DELIVERY_BOY_ORDERS, setOrders] = useState([]);

    useEffect(() => {
        setOrders([]);
        return () => {
        }
    }, [status, _id, refresh_count])

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getData = () => {
            if (token != null) {
                setLoading(true)
                axios({
                    method: 'GET',
                    url: urls.GET_REQUEST.DELIVERY_BOY_ORDERS + _id,
                    headers: {
                        'authorization': token
                    },
                    params: { page: page, limit: limit, status: status },
                    cancelToken: source.token
                }).then(res => {
                    setLoading(false);
                    setHasMore(res.data.data.docs && res.data.data.docs.length > 0);
                    setOrders(prevOrders => {
                        return [...new Set([...prevOrders, ...res.data.data.docs])]
                    })
                }).catch(err => {
                    console.log('Get getDeliveryBoyOrdersPageLimit Error:', err);
                    setLoading(false)
                    if (axios.isCancel(err)) return
                })
            }
        }
        getData();
        return () => {
            getData;
            source.cancel();
        };
    }, [page, limit, status, refresh_count]);

    return {
        DELIVERY_BOY_ORDERS_LOADING,
        DELIVERY_BOY_ORDERS_HASMORE,
        DELIVERY_BOY_ORDERS
    }
}