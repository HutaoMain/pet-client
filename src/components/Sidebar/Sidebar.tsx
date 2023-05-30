import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PET SHOP MANAGEMENT SYSTEM</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Inventory Management</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              {/* <DashboardIcon className="icon" /> */}
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              {/* <DashboardIcon className="icon" /> */}
              <span>Products</span>
            </li>
          </Link>
          <p className="title">Maintenance</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              {/* <PersonOutlineIcon className="icon" /> */}
              <span>Users</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              {/* <CreditCardIcon className="icon" /> */}
              <span>Maintenance</span>
            </li>
          </Link>
          <Link to="/reservations" style={{ textDecoration: "none" }}>
            <li>
              {/* <LocalShippingIcon className="icon" /> */}
              <span>Reservation</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
