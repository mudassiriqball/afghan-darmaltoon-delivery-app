import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urls from '../utils/urls';

export default function SearchOrderForDropDelivery(code, token) {
    const [ORDER_LOADING, setLoading] = useState(false)
    const [ORDER_ERROR, setError] = useState('')
    const [ORDER_DATA, setOrder] = useState(null)
    useEffect(() => {
        const getData = () => {
            setOrder(null);
            setLoading(true)
            setError(false)
            axios({
                method: 'GET',
                url: urls.GET_REQUEST.ORDER_BY_CODE + code,
                headers: {
                    'authorization': token
                }
            }).then(res => {
                setLoading(false)
                setOrder(res.data.data[0])
            }).catch(err => {
                console.log('SearchOrderForDropDelivery Error:', err);
                setLoading(false)
                setError(true)
            })
        }
        if (code !== null)
            getData();
        return () => {
            getData;
        };
    }, [code]);

    return {
        ORDER_LOADING,
        ORDER_ERROR,
        ORDER_DATA,
    }
}