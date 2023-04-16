import * as api from '../api/index'
import axios from 'axios';
import { GET_PRODUCT, MAKE_PAYMENT,RESET_PRODUCT } from '../constants/actionTypes'

export const getProduct = (productId) => async (dispatch) => {
    try {
        console.log(productId)
        const { data } = await api.getProduct(productId)
        const action = { type: GET_PRODUCT, product: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const resetProduct = () => async (dispatch) => {
    try {
        const action = { type: RESET_PRODUCT, product: {} }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

const initPayment = (data, product) => {
    const options = {
        key: "rzp_test_L6r3iUMhxSgpSE",
        key_secret: "LKGT6Ee7dpj00Ck3nu4E1vNq",
        amount: data.amount,
        currency: data.currency,
        name: product.name,
        description: product.description.substring(0,252),
        image: product.img,
        order_id: data.id,
        handler: async (response) => {
            try {
                const verifyUrl = "http://localhost:8000/orders/verify";
                const { data } = await axios.post(verifyUrl, response);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};


export const buyProduct =(product)=> async (dispatch) => {
    try {
        const orderUrl = "http://localhost:8000/orders/orders";
        const { data } = await axios.post(orderUrl, { amount: product.price });
        console.log(data);
        initPayment(data.data, product);
        const action = { type: MAKE_PAYMENT, product: data }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
};