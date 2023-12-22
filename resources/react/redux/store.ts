// Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Slicers
import sidebar from './slicers/components/sidebar';
import cart from "./slicers/components/cart";
import productsPage from './slicers/pages/products';
import customersPage from './slicers/pages/customers';
import usersPage from "./slicers/pages/users";
import salesPage from "./slicers/pages/sales";


// Reducers
const reducers = combineReducers({
  sidebar,
  cart,
  productsPage,
  customersPage,
  usersPage,
  salesPage
});

// Store
export const store = configureStore({
  reducer: reducers
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
