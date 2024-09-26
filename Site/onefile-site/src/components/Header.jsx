import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={"/products"} className="App-header">
      <h1>Inventory Management</h1>
    </Link>
  );
};

export default Header;
