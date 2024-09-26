import { putProduct, postProduct } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = ({ productId, productName, price, quantity }) => {
  const [form, setForm] = useState({ productName, price, quantity });
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (productName || price || quantity) {
      document.getElementById("productName").value = productName;
      document.getElementById("price").value = price;
      document.getElementById("quantity").value = quantity;
    }
  }, []);

  const handleChange = (event) => {
    setIsInvalid(false);

    if (event.target.classList.contains("invalid"))
      event.target.classList.remove("invalid");
    event.target.previousElementSibling.innerText = "";
    setForm((currentForm) => {
      return { ...currentForm, [event.target.id]: event.target.value };
    });
  };
  const handleBlur = ({ target }) => {
    checkForError(target);
  };
  const checkForError = (element) => {
    const { value, id } = element;
    const field = document.getElementById(`${id}`);
    if (value === undefined || value === "") {
      field.classList.add("invalid");
      field.placeholder = "Required";
      setIsInvalid(true);
    }
    if (value.length >= 100) {
      field.classList.add("invalid");
      field.previousElementSibling.innerText =
        "Must be less than 100 characters";
      setIsInvalid(true);
    }
    if (!(id === "quantity" || id === "price")) return;

    if (isNaN(value)) {
      field.classList.add("invalid");
      field.value = "";
      field.placeholder = "Must be a number";
      setIsInvalid(true);
    }
    if (value < 0) {
      field.classList.add("invalid");
      field.value = "";
      field.placeholder = "Must be positive";
      setIsInvalid(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Array.from(document.getElementsByClassName("form-input"));
    const errorMessage = document.getElementById("error-message");

    fields.forEach((field) => {
      checkForError(field);
    });
    if (isInvalid) {
      errorMessage.innerText = "Please correct errors";
      return;
    }
    setIsPosting(true);
    console.log(productId);
    if (productId) {
      console.log({ ...form });
      putProduct(productId, { ...form, productId }).then(() => {
        return navigate(`/products`);
      });
    } else {
      postProduct({ ...form })
        .then(() => {
          return navigate(`/products`);
        })
        .catch((err) => {
          if (err.status === 400) {
            errorMessage.innerText = "Please complete all fields";
          } else {
            errorMessage.innerText = "Something went wrong, please try again";
          }
        });
    }
  };
  return isPosting ? (
    <h3>Posting...</h3>
  ) : (
    <form onSubmit={handleSubmit}>
      <label className="label" htmlFor="productName">
        Product name:
      </label>
      <span className="err"></span>
      <input
        type="text"
        className="form-input"
        placeholder="Product name"
        id="productName"
        onChange={handleChange}
        onBlur={handleBlur}
        innerText={productName}
      ></input>

      <label className="label" htmlFor="price">
        Price (£):
      </label>
      <span className="err"></span>
      <input
        type="text"
        className="form-input"
        placeholder="£0.00"
        id="price"
        min={0}
        onChange={handleChange}
        onBlur={handleBlur}
        innerText={price}
      ></input>
      <label className="label" htmlFor="quantity">
        Quantity:
      </label>
      <span className="err"></span>
      <input
        type="text"
        className="form-input"
        placeholder="0"
        id="quantity"
        min={0}
        onChange={handleChange}
        onBlur={handleBlur}
        innerText={quantity}
      ></input>
      <button type="submit">Submit</button>
      <span id="error-message"></span>
    </form>
  );
};
