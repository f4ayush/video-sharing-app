import { RESET_LOGIN_ERROR_MESSAGE, LOGIN_FAILURE, RESET_NO_PRODUCTS_MESSAGE, NO_PRODUCTS_MESSAGE } from '../constants/actionTypes'


export default (message = "", action) => {
    switch (action.type) {
        case RESET_LOGIN_ERROR_MESSAGE:
            return "";
        case LOGIN_FAILURE:
            return action.message;
        case RESET_NO_PRODUCTS_MESSAGE:
            return "";
        case NO_PRODUCTS_MESSAGE:
            return action.message;
        default:
            return message;
    }
};

