// const axios = require("axios").default;
import axios from "axios";
import type { newProduct } from "../../types";

axios.defaults.baseURL = import.meta.env.VITE_baseURL;

const getItem = async (id: string) => {
  const data = await axios
    .get(`/products/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

const addItem = async (item: newProduct) => {
  await axios
    .post("/products/add", item)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getAllProducts = async () => {
  const data = await axios
    .get("/products?limit=100")
    .then((response) => response.data);
  console.log("data :>> ", data.products);
  return data.products;
};

const getProducts = async (skip = 0) => {
  const data = await axios
    .get(`/products?limit=10&skip=${skip}`)
    .then((response) => response.data);
  console.log("data :>> ", data.products);
  return data.products;
};

const deleteItem = async (id: number) => {
  const deletedItem = await axios
    .delete(`products/${id}`)
    .then((res) => res.data);
  console.log("deletedItem :>> ", deletedItem);
};

const updateItem = async (id: string, newProduct: object) => {
  return await axios
    .put(`/products/${id}`, newProduct)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export {
  getAllProducts,
  getProducts,
  getItem,
  addItem,
  updateItem,
  deleteItem,
};
