import { ALL_PRODUCTS, SEARCH_PRODUCTS } from '../constants/actionTypes'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (products = [], action) => {
    switch (action.type) {
        case ALL_PRODUCTS:
            return action.products;
        // case CREATE:
        //     return [...products, action.payload];
        // case UPDATE:
        //     return products.map((post) => (post._id === action.payload._id ? action.payload : post));
        // case DELETE:
        //     return products.filter((post) => post._id !== action.payload);
        default:
            return products;
    }
};

