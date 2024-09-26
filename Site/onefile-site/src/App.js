import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import DeleteProduct from "./components/DeleteProduct";
import { AiFillPlusCircle } from "react-icons/ai";
import { EditProduct } from "./components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
          <Route
            path="/product/delete/:productId"
            element={<DeleteProduct />}
          />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
