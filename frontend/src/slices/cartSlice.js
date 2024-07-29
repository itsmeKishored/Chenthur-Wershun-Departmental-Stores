import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: {
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action){
            const item = action.payload

            const isItemExist = state.items.find( i => i.product === item.product);
            
            if(isItemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            }else{
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
            return state
            
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            }
        }

    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest, 
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
 } = actions;

export default reducer;




// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
//         loading: false,
//         shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
//     },
//     reducers: {
//         addCartItemRequest(state) {
//             state.loading = true;
//         },
//         addCartItemSuccess(state, action) {
//             const item = action.payload;
//             const isItemExist = state.items.find(i => i.product === item.product);
            
//             if (isItemExist) {
//                 state.loading = false;
//             } else {
//                 state.items.push(item);
//                 state.loading = false;
//                 localStorage.setItem('cartItems', JSON.stringify(state.items));
//             }
//         },
//         increaseCartItemQty(state, action) {
//             state.items = state.items.map(item => {
//                 if (item.product === action.payload) {
//                     item.quantity += 1;
//                 }
//                 return item;
//             });
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         decreaseCartItemQty(state, action) {
//             state.items = state.items.map(item => {
//                 if (item.product === action.payload) {
//                     item.quantity -= 1;
//                 }
//                 return item;
//             });
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         removeItemFromCart(state, action) {
//             state.items = state.items.filter(item => item.product !== action.payload);
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         saveShippingInfo(state, action) {
//             localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
//             state.shippingInfo = action.payload;
//         },
//         orderCompleted(state) {
//             localStorage.removeItem('shippingInfo');
//             localStorage.removeItem('cartItems');
//             sessionStorage.removeItem('orderInfo');
//             state.items = [];
//             state.loading = false;
//             state.shippingInfo = {};
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createOrder.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(createOrder.fulfilled, (state) => {
//                 state.items = [];
//                 state.loading = false;
//                 state.shippingInfo = {};
//                 localStorage.removeItem('shippingInfo');
//                 localStorage.removeItem('cartItems');
//                 sessionStorage.removeItem('orderInfo');
//             })
//             .addCase(createOrder.rejected, (state, action) => {
//                 state.loading = false;
//                 console.error(action.payload);
//             });
//     }
// });

// const { actions, reducer } = cartSlice;

// export const {
//     addCartItemRequest,
//     addCartItemSuccess,
//     decreaseCartItemQty,
//     increaseCartItemQty,
//     removeItemFromCart,
//     saveShippingInfo,
//     orderCompleted
// } = actions;

// export default reducer;






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// export const createOrder = createAsyncThunk(
//     'cart/createOrder',
//     async (orderData, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.post('/api/orders/create', orderData);
//             return data.order;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
//         loading: false,
//         shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
//     },
//     reducers: {
//         addCartItemRequest(state) {
//             state.loading = true;
//         },
//         addCartItemSuccess(state, action) {
//             const item = action.payload;
//             const isItemExist = state.items.find(i => i.product === item.product);
            
//             if (isItemExist) {
//                 state.loading = false;
//             } else {
//                 state.items.push(item);
//                 state.loading = false;
//                 localStorage.setItem('cartItems', JSON.stringify(state.items));
//             }
//         },
//         increaseCartItemQty(state, action) {
//             state.items = state.items.map(item => {
//                 if (item.product === action.payload) {
//                     item.quantity += 1;
//                 }
//                 return item;
//             });
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         decreaseCartItemQty(state, action) {
//             state.items = state.items.map(item => {
//                 if (item.product === action.payload) {
//                     item.quantity -= 1;
//                 }
//                 return item;
//             });
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         removeItemFromCart(state, action) {
//             state.items = state.items.filter(item => item.product !== action.payload);
//             localStorage.setItem('cartItems', JSON.stringify(state.items));
//         },
//         saveShippingInfo(state, action) {
//             localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
//             state.shippingInfo = action.payload;
//         },
//         orderCompleted(state) {
//             localStorage.removeItem('shippingInfo');
//             localStorage.removeItem('cartItems');
//             sessionStorage.removeItem('orderInfo');
//             state.items = [];
//             state.loading = false;
//             state.shippingInfo = {};
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createOrder.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(createOrder.fulfilled, (state) => {
//                 state.items = [];
//                 state.loading = false;
//                 state.shippingInfo = {};
//                 localStorage.removeItem('shippingInfo');
//                 localStorage.removeItem('cartItems');
//                 sessionStorage.removeItem('orderInfo');
//             })
//             .addCase(createOrder.rejected, (state, action) => {
//                 state.loading = false;
//                 console.error(action.payload);
//             });
//     }
// });

// const { actions, reducer } = cartSlice;

// export const {
//     addCartItemRequest,
//     addCartItemSuccess,
//     decreaseCartItemQty,
//     increaseCartItemQty,
//     removeItemFromCart,
//     saveShippingInfo,
//     orderCompleted
// } = actions;

// //export { createOrder }; // Ensure createOrder is exported

// export default reducer;
