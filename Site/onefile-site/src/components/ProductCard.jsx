import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCard = ({
  product: { productId, productName, quantity, price },
}) => {
  return (
    <li className="product-card">
      <h4>{productName}</h4>
      <p>Quantity: {quantity}</p>
      <p>Price: £{price}</p>
      <Link to={`/product/edit/${productId}`}>
        <button>
          <AiFillEdit />
        </button>
      </Link>
      <Link to={`/product/delete/${productId}`}>
        <button>
          <AiFillDelete />
        </button>
      </Link>
    </li>
  );
};

export default ProductCard;
