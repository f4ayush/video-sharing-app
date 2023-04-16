import { ADD_TO_CART, UPDATE_CART_ITEM, GET_CART_ITEMS, DELETE_CART_ITEMS, DELETE_ALL_CART_ITEMS } from '../constants/actionTypes'

export default (products = [], action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            return action.products;
        case UPDATE_CART_ITEM:
            return products.map((p) => (p._id === action.product._id ? action.product : p));
        // case ADD_TO_CART:
        //     return [...products, action.payload];
        case DELETE_ALL_CART_ITEMS:
            return [];
        case DELETE_CART_ITEMS:
            return products.filter((product) => product._id !== action.products);
        default:
            return products;
    }
};

