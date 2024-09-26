import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { fetchProductById } from "../api";
import { ProductForm } from "./ProductForm";

export const EditProduct = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  useEffect(() => {
    fetchProductById(productId)
      .then(({ product }) => {
        console.log(product);
        setIsLoading(false);
        setProduct(product);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.status === 404) {
          return <h3>Not Found</h3>;
        }
        return <h3>{err.status} Something Went Wrong</h3>;
      });
  }, []);

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <main>
      <h3>Edit Product</h3>
      <ProductForm
        productId={product.productId}
        productName={product.productName}
        price={product.price}
        quantity={product.quantity}
      />
    </main>
  );
};
