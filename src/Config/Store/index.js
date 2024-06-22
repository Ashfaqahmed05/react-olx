import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    search: searchReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };