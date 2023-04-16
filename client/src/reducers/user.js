import { LOGOUT, LOGIN_BUYER, SIGNUP_BUYER } from '../constants/actionTypes'
export default (user = JSON.parse(localStorage.getItem("profile")), action) => {
    switch (action.type) {
        case SIGNUP_BUYER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...action?.data};
        case LOGIN_BUYER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return {...action?.data};
        case LOGOUT:
            localStorage.clear();
            return {};
        default:
            return user;
    }
}