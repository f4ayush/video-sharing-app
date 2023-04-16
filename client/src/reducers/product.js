import { GET_PRODUCT, RESET_PRODUCT } from '../constants/actionTypes'


export default (product = {}, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        case RESET_PRODUCT:
            return {};
        // case CREATE:
        //     return [...products, action.payload];
        // case UPDATE:
        //     return products.map((post) => (post._id === action.payload._id ? action.payload : post));
        // case DELETE:
        //     return products.filter((post) => post._id !== action.payload);
        default:
            return product;
    }
};

