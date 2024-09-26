import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { postProduct } from "../api";
import Product from "./Product";
import { ProductForm } from "./ProductForm";

const AddProduct = () => {
  return (
    <main>
      <h3>Add Product</h3>
      <ProductForm />
    </main>
  );
};
export default AddProduct;
