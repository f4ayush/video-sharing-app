import * as api from '../api/index'
import axios from 'axios';
import { DELETE_CART_ITEMS, DELETE_ALL_CART_ITEMS, ADD_TO_CART, GET_CART_ITEMS, UPDATE_CART_ITEM } from '../constants/actionTypes'

export const addToCart = (product) => async (dispatch) => {
    try {
        const { data } = await api.addToCart(product)
        const action = { type: ADD_TO_CART, product: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const getCartItems = () => async (dispatch) => {
    try {
        const { data } = await api.getCartItems()
        const action = { type: GET_CART_ITEMS, products: data.items }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const deleteCartItems = (productId) => async (dispatch) => {
    try {
        const { data } = await api.deleteCartItems(productId)
        const action = { type: DELETE_CART_ITEMS, products: productId }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const updateCartItem = (product) => async (dispatch) => {
    try {
        const { data } = await api.updateCartItem(product)
        console.log(product)
        const action = { type: UPDATE_CART_ITEM, product: product}
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}
export const checkout = (total)=> async(dispatch)=>{
    try{
        const { data } = await api.checkout({ amount: total })
        const action = { type: DELETE_ALL_CART_ITEMS, products: [] }
        await initPayment(data.data);
        dispatch(action)
    }catch(error){
        console.log(error)
    }
}

const initPayment = async (data) => {
    const options = {
        key: "rzp_test_L6r3iUMhxSgpSE",
        key_secret: "LKGT6Ee7dpj00Ck3nu4E1vNq",
        amount: data.amount,
        currency: data.currency,
        name: "Checkout",
        description: "",
        order_id: data.id,
        handler: async (response) => {
            try {
                const verifyUrl = "http://localhost:8000/checkout/verify";
                const { data } = await api.verifyPayment(response);
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