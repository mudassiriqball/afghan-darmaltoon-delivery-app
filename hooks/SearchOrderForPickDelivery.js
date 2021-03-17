import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urls from '../utils/urls';

export default function SearchOrderForPickDelivery(_id, token) {
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
                url: urls.GET_REQUEST.ORDER_BY_ID + _id,
            }).then(res => {
                setLoading(false)
                console.log('ORDER_DATA:', res.data.data[0])
                setOrder(res.data.data[0])
            }).catch(err => {
                console.log('SearchOrderForPickDelivery Error:', err);
                setLoading(false)
                setError(true)
            })
        }
        if (_id !== null)
            getData()
        return () => {
            getData;
        };
    }, [_id]);


    return {
        ORDER_LOADING,
        ORDER_ERROR,
        ORDER_DATA,
    }
}