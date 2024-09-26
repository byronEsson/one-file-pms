import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api";
import { Link } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();
  const [requestError, setRequestError] = useState(null);
  useEffect(() => {
    fetchProducts()
      .then(({ products }) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch(({ status }) => {
        setRequestError(status);
        setIsLoading(false);
      });
  });

  if (requestError === 404) {
    return <h2>404: Products Not Found</h2>;
  } else if (requestError != null) {
    return <p>{requestError}</p>;
  }
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <main>
      <Link to="/products/add">
        <AiFillPlusSquare className="add-product" />{" "}
      </Link>
      <ul className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.productId} product={product} />;
        })}
      </ul>
    </main>
  );
};

export default ProductList;
