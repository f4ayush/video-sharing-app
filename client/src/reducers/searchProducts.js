import { ALL_PRODUCTS, SEARCH_PRODUCTS } from '../constants/actionTypes'
export default (products = [], action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return action.products;
        default:
            return products;
    }
};

