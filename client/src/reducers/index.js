import { combineReducers } from "redux";
import user from './user'
import allProducts from './allProducts'
import product from "./product";
import cart from "./cart";
import error from "./error";
import isLoading from "./isLoading";
import searchProducts from "./searchProducts";
import flashMessage from "./flashMessage";
import allVideos from "./allVideos";

export default combineReducers({
    user,
    allProducts,
    product,
    cart,
    searchProducts,
    error,
    isLoading, 
    flashMessage,
    allVideos
})