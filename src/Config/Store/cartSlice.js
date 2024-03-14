import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart.push(action.payload)
      console.log('data', action)
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
      console.log('data removed:', action.payload)
      return state
    }
  }
})

export const { updateCart, removeFromCart } = cartSlice.actions
export default cartSlice