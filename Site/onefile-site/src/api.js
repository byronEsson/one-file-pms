import axios from "axios";

const myApi = axios.create({
  baseURL: "http://localhost:5247/api",
});

export const fetchProducts = async () => {
  const { data, status } = await myApi.get(`/products`);
  return { products: data, status };
};

export const fetchProductById = async (id) => {
  console.log(id);
  const { data, status } = await myApi.get(`/products/${id}`);
  return { product: data, status };
};

export const postProduct = async (product) => {
  const { data, status } = await myApi.post("/products", product);
  return { product: data, status };
};

export const deleteProduct = async (id) => {
  const { status } = await myApi.delete(`products/${id}`);
  return { status };
};

export const putProduct = async (id, product) => {
  const { status } = await myApi.put(`products/${id}`, product);
  return { status };
};
