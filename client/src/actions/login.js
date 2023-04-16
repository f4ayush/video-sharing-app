import * as api from '../api/index'
import { LOGIN_BUYER, SIGNUP_BUYER, RESET_LOGIN_ERROR_MESSAGE, LOGIN_FAILURE, IS_LOADING, SUCCESS_MESSAGE  } from "../constants/actionTypes";

export const login = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.logInSeller(formData)
        const action = { type: 'loginSeller', data }
        dispatch(action)
        history.goBack()
    } catch (error) {
        console.log(error)
    }

}

export const loginBuyer = (formData, history) => async (dispatch) => {
    try {
        if(formData.email && formData.password){
            dispatch({ type: IS_LOADING, value: true })
            const { data } = await api.logInBuyer(formData)
            const action = { type: LOGIN_BUYER, data }
            dispatch(action)
            dispatch({ type: IS_LOADING, value: false })
            dispatch({ type: RESET_LOGIN_ERROR_MESSAGE, message:"" })
            history.goBack()
        }else{
            dispatch({ type: LOGIN_FAILURE, message: "All fields required" })
        }
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({ type: LOGIN_FAILURE, message: error.response.data.message })
        dispatch({ type: IS_LOADING, value: false })
    }

}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createSeller(formData)
        const action = { type: 'signUpSeller', data }
        dispatch(action)
        history.goBack()
    } catch (error) {
        console.log(error)
    }

}

export const signUpBuyer = (formData, history) => async (dispatch) => {
    try {
        const {email, lastName, firstName, password} = formData
        console.log(email, lastName, firstName, password)
        let message = validate(email, lastName, firstName, password)
        if(message == "success"){
            dispatch({ type: IS_LOADING, value: true })
            const { data } = await api.createBuyer(formData)
            const action = { type: SIGNUP_BUYER, data }
            dispatch(action)
            dispatch({ type: IS_LOADING, value: false })
            dispatch({ type: RESET_LOGIN_ERROR_MESSAGE, message:"" })
            history.goBack()
        }else{
            dispatch({ type: LOGIN_FAILURE, message: message})
            dispatch({ type: IS_LOADING, value: false })
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGIN_FAILURE, message: error.response.data.message })
    }
}

export const forgetPassword = (email)=> async (dispatch)=>{
    try {
        dispatch({ type: IS_LOADING, value: true })
        const {data} = await api.forgotPassword(email);
        console.log(data)
        dispatch({ type: IS_LOADING, value: false })
        dispatch({ type: SUCCESS_MESSAGE, value: data.message })
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGIN_FAILURE, message: error.response.data.message })
        dispatch({ type: IS_LOADING, value: false })
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
export const resetPassword = (token, password, confirmPassword, history)=> async (dispatch)=>{
    try {
        let message = checkPassword(password, confirmPassword)
        if(message == "success"){
            dispatch({ type: IS_LOADING, value: true })
            const {data} = await api.resetPassword(token, {password});
            dispatch({ type: IS_LOADING, value: false })
            dispatch({ type: RESET_LOGIN_ERROR_MESSAGE, message:"" })
            dispatch({ type: SUCCESS_MESSAGE, value: data.message })
            await delay(2000)
            history.push("/login")
        }else{
            dispatch({ type: LOGIN_FAILURE, message: message })
            dispatch({ type: IS_LOADING, value: false })
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGIN_FAILURE, message: error.response.data.message })
    }
}
const validate = (email,lastName, firstName, password)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!mailformat.test(email)){
        return "Enter valid email"
    }else if(password.length < 5){
        return "Password length should be greater than 5"
    }else if(firstName.length == 0){
        return "first name required"
    }else if (lastName.length == 0){
        return "last name required"
    }else{
        return "success"
    }
}

const checkPassword = (password, confirmPassword, dispatch)=>{
    if(password != confirmPassword){
        return "Passwords do not match"
    }else if(password < 5){
        return "Password length should be greater than 5"
    }
    return "success"
}