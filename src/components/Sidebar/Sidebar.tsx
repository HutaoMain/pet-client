import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-top-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="sidebar-logo">PET SHOP MANAGEMENT SYSTEM</span>
        </Link>
      </div>
      <hr className="sidebar-hr" />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-title">Dashboard</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/" ? "sidebar-active" : ""}>
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Dashboard
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Inventory Management</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/categories" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/categories"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Categories
              </span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/products" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/products"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Products
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Pet Management</p>
          <Link to="/pets" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/pets" ? "sidebar-active" : ""}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/pets"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Pets
              </span>
            </li>
          </Link>
          <Link to="/appointment" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/appointment" ? "sidebar-active" : ""
              }
            >
              {/* <CreditCardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/appointment"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Appointments
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Staff Management</p>
          <Link to="/staff" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/staff" ? "sidebar-active" : ""}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/staff"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Staff
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Supplier Management</p>
          <Link to="/supplier" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/supplier" ? "sidebar-active" : ""
              }
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/supplier"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Suppliers
              </span>
            </li>
          </Link>
          <Link to="/deliveries" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/deliveries" ? "sidebar-active" : ""
              }
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/deliveries"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Orders/Deliveries
              </span>
            </li>
          </Link>
          {/*  */}
          <p className="sidebar-title">Customer Relationship Management</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/users" ? "sidebar-active" : ""}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/users"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Users
              </span>
            </li>
          </Link>

          {/*  */}
          <p className="sidebar-title">Point of Sale</p>
          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/transactions" ? "sidebar-active" : ""
              }
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/transactions"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Transactions
              </span>
            </li>
          </Link>

          {/*  */}
          <p className="sidebar-title">Promotion</p>
          <Link to="/email" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/email" ? "sidebar-active" : ""}
            >
              {/* <PersonOutlineIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/email"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Promotional Email
              </span>
            </li>
          </Link>

          <p className="sidebar-title">USER</p>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span className="sidebar-title-span">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
