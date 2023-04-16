import { SUCCESS_MESSAGE } from '../constants/actionTypes'


export default (value = "", action) => {
    switch (action.type) {
        case SUCCESS_MESSAGE:
            return action.value;
        default:
            return value;
    }
};

