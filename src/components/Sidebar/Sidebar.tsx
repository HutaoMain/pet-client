import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import Modal from "react-modal";
import PromotionalEmail from "../PromotionalEmail/PromotionalEmail";
import useAuthStore from "../../zustand/AuthStore";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    zIndex: 99999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "8px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const Sidebar = () => {
  const location = useLocation();

  const clearUser = useAuthStore((state) => state.clearUser);

  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen(!open);
  };

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

          <p className="sidebar-title">Promotion</p>

          <li
            className={location.pathname === "/email" ? "sidebar-active" : ""}
            onClick={toggleModal}
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

          <p className="sidebar-title">USER</p>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span className="sidebar-title-span" onClick={clearUser}>
              Logout
            </span>
          </li>
        </ul>
      </div>
      <Modal isOpen={open} onRequestClose={toggleModal} style={customStyles}>
        <PromotionalEmail />
      </Modal>
    </div>
  );
};

export default Sidebar;
