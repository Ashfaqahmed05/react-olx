import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    updateCart: (state, action) => {
      const existingItemIndex = state.cart.findIndex(item => item.Product_ID === action.payload.Product_ID);
      if (existingItemIndex === -1) {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
        console.log(state.cart);
      } else {
        console.log('Item already exists in cart:', action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.Product_ID !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const { Product_ID } = action.payload;
      const itemToUpdate = state.cart.find(item => item.Product_ID === Product_ID);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        
      }
    },
    decrementQuantity: (state, action) => {
      const { Product_ID } = action.payload;
      const itemToUpdate = state.cart.find(item => item.Product_ID === Product_ID);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      }
    }
  }
});

export const { updateCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
