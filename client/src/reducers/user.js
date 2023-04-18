import { LOGOUT, LOGIN, SIGNUP } from '../constants/actionTypes'
export default (user = JSON.parse(localStorage.getItem("profile")), action) => {
    switch (action.type) {
        case SIGNUP:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...action?.data};
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return {...action?.data};
        case LOGOUT:
            localStorage.clear();
            return {};
        default:
            return user;
    }
}