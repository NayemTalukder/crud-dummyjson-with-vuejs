/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import type { RootState, product, cartItem } from "../types";
import { initialNewProductState, initialModalState, initialFilterState } from "./initialStates";
import { getFieldValuePair } from "../helper";

export const useProductStore = defineStore({
  id: "product",
  state: () =>
  ({
    products: [],
    filteredProducts: [],
    rawProducts: [],
    modalState: initialModalState,
    newProduct: initialNewProductState,
    filter: initialFilterState,
    loader: false,
    loaderOverlay: false,
    cart: [],
    limitReached: false
  } as RootState),
  getters: {
    // products: (state) => state.products,
  },
  actions: {
    setProducts(value: product[]) {
      if (!value) return;
      this.products = value;
    },
    setFilteredProducts(value: product[]) {
      if (!value) return;
      this.filteredProducts = value;
    },
    setRowProducts(value: product[]) {
      if (!value) return;
      this.rawProducts = value;
    },
    setCart(value: cartItem[]) {
      if (!value) return;
      this.cart = value;
    },
    setLimitReached(value: boolean) {
      if (!value) return;
      this.limitReached = value;
    },
    setNewProduct(field: string, value: string | number | string[]) {
      const pair = getFieldValuePair(field, value);
      this.newProduct = { ...this.newProduct, ...pair } as never;
    },
    setModalState(value: any) {
      if (!value) return;
      this.modalState = { ...this.modalState, ...value };
    },
    setFilter(value: any) {
      if (!value) return;
      this.filter = { ...this.filter, ...value };
    },
    setLoader(value: boolean) {
      this.loader = value;
    },
    setLoaderOverlay(value: boolean) {
      this.loaderOverlay = value;
    },
    resetNewProduct() {
      this.newProduct = initialNewProductState;
    },
    resetModalState() {
      this.modalState = initialModalState;
    },
    resetFilter() {
      this.filter = initialFilterState;
    },
  },
});
