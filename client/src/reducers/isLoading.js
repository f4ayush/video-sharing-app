import { IS_LOADING } from '../constants/actionTypes'


export default (value = false, action) => {
    switch (action.type) {
        case IS_LOADING:
            return action.value;
        default:
            return value;
    }
};

