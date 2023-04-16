import * as api from '../api/index'
import { ALL_PRODUCTS, SEARCH_PRODUCTS, NO_PRODUCTS_MESSAGE, RESET_NO_PRODUCTS_MESSAGE } from '../constants/actionTypes'

export const allProducts = () => async (dispatch) => {
    try {
        dispatch({type: RESET_NO_PRODUCTS_MESSAGE, message: ''})
        const { data } = await api.allProducts()
        const action = { type: ALL_PRODUCTS, products: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const searchProducts = (param) => async (dispatch) => {
    try {
        const { data } = await api.searchProducts(param)
        const action = { type: SEARCH_PRODUCTS, products: data }
        dispatch(action)
        if(data.length > 0){
            dispatch({type: RESET_NO_PRODUCTS_MESSAGE, message: ''})
        }else{
            dispatch({type: NO_PRODUCTS_MESSAGE, message: 'Sorry, no results found!'})
        }
    } catch (error) {
        console.log(error)
    }
}