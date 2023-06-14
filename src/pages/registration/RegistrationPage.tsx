import React, { useState } from "react";
import "./RegistrationPage.css";
import { loginInterface } from "../../types/Types";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [registrationInfo, setRegistrationInfo] = useState<loginInterface>({
    email: "",
    password: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        registrationInfo
      );
      toast("Successful Registration!", {
        type: "success",
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(registrationInfo);

  return (
    <div className="registration-container">
      <section className="registration-header">
        <h1>Register</h1>
        {/* <h3>Create your Account</h3> */}
      </section>
      <div className="registration-title">
        <h1>Please enter your details</h1>
      </div>
      <div className="registration-form">
        <form>
          <div className="registration-input-group">
            <label htmlFor="password">Email</label>
            <input
              type="emal"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={registrationInfo.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password name"
              value={registrationInfo.password}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-button-group">
            <button type="submit" onClick={handleSubmit}>
              Register
            </button>
            <Link
              to="/login"
              className="registration-link"
              style={{ textDecoration: "none" }}
            >
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
