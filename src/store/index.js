/*
 * @category  REG
 * @author    Wiktor Koscielny <wiktorkoscielny@gmail.com>
 */

import { createSlice, configureStore } from "@reduxjs/toolkit";

// temporarily keep all the state and slices at once

const initialState = {
  currencies: [
    {
      label: [],
      symbol: [],
    },
  ],
  currentCurrency: "$",
  techCateg: [],
  clothesCateg: [],
  allCateg: [],
  productId: {},
  pathnameId: "",
  currentCategory: "tech",
  // sotrage of shopping cart
  storageOfProducts: {
    products: [],
  },
  forceUpdate: 1,
  configComponent: false,
  modalText: "",
  // inStock: [],
  loading: false,
};

/** @namespace REG/Store/Slice/regMainSlice */
const RegMainSlice = createSlice({
  name: "regMainSlice",
  initialState,
  reducers: {
    updateLoader: (state, action) => {
      state.loading = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setPathNameId: (state, action) => {
      state.pathnameId = action.payload;
    }
  },
});

export const store = configureStore({
  reducer: {
    regMainSlice: RegMainSlice.reducer,
  },
});
