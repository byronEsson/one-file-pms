import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, fetchProductById } from "../api";

const DeleteProduct = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  const [requestError, setRequestError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchProductById(productId)
      .then(({ product }) => {
        setProduct(product);
        setIsLoading(false);
      })
      .catch(({ status }) => {
        setRequestError(status);
        setIsLoading(false);
      });
  }, []);

  const handleConfirmClick = (event) => {
    setIsDeleting(true);
    deleteProduct(productId)
      .then(() => {
        setIsDeleted(true);
        setIsDeleting(false);
      })
      .catch((err) => {
        setIsDeleting(false);
        event.target.innerText = "Try Again";
      });
  };
  const handleBackClick = () => {
    navigate("/products");
  };
  return isLoading ? (
    <h3>Loading...</h3>
  ) : isDeleting ? (
    <h3>Deleting...</h3>
  ) : isDeleted ? (
    <main>
      <h3>Deleted</h3>
      <button onClick={handleBackClick}>Back to product list</button>
    </main>
  ) : (
    <main>
      <h3>Delete {product.productName}?</h3>
      <button onClick={handleConfirmClick} id="yes-button">
        Yes
      </button>
      <button onClick={handleBackClick}>No</button>
    </main>
  );
};

export default DeleteProduct;
