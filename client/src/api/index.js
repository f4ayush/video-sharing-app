import axios from 'axios'

// const API = axios.create({ baseURL: 'https://flipkart-5zfu.vercel.app' })
const API = axios.create({ baseURL: 'http://localhost:5000' })
API.interceptors.request.use((req) => {
    
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const createSeller = (sellerData) => API.post('/seller/signUp', sellerData)
export const logInSeller = (sellerData) => API.post('/seller/login', sellerData)

export const createBuyer = (userData) => API.post('/users/sign-up', userData)
export const logInBuyer = (userData) => API.post('/users/login', userData)
export const resetPassword = (token, password) => API.post('/users/reset-password/'+token, password)
export const forgotPassword = (email) => API.post('/users/forgot-password', email)

export const allProducts = () => API.get('/products')

export const getProduct = (productId) => API.get('/products/'+productId)
export const searchProducts = (param) => API.get('/products/search?q='+param)
export const addToCart = (product) => API.post('/cart', product)
export const updateCartItem = (product) => API.put('/cart/'+product._id, product)
export const deleteCartItems = (productId) => API.delete('/cart/'+productId)
export const getCartItems = () => API.get('/cart')
export const checkout = (data) => API.post('/checkout/makePayment', data)
export const verifyPayment = (data) => API.post('/checkout/verify', data)
export const addProduct = (sellerData) => API.post('/products', sellerData)
export const deleteProduct = (productDetails) => API.post('/seller/deleteProduct', productDetails)
export const editProduct = (productDetails) => API.post('/seller/editProduct', productDetails)



export const sellerProducts = (userId) => API.post('/seller/sellerProducts', { userId })
