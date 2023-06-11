import React, { useState } from "react";
import { addStaffInterface } from "../../../types/Types";
import { Check, Close } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const AddStaff = ({ toggleModalAdd }: any) => {
  const [staffInfo, setStaffInfo] = useState<addStaffInterface>({
    employeeName: "",
    employeeId: "",
    role: "",
    contactNumber: "",
    address: "",
    gender: "female",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setStaffInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/staff/create`, {
        ...staffInfo,
      });
      toast.success("Sucessfully added staff!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Staff</div>
      <hr style={{ marginBottom: "20px" }} />

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Staff Name</label>
        <input
          className="addproduct-input"
          type="text"
          name="employeeName"
          value={staffInfo.employeeName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Staff ID</label>
        <input
          className="addproduct-input"
          type="text"
          name="employeeId"
          value={staffInfo.employeeId}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Role</label>
        <input
          className="addproduct-input"
          type="text"
          name="role"
          value={staffInfo.role}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Contact Number</label>
        <input
          className="addproduct-input"
          type="text"
          name="contactNumber"
          value={staffInfo.contactNumber}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Gender</label>
        <select
          name="gender"
          value={staffInfo.gender}
          onChange={onChangeHandler}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Address</label>
        <input
          className="addproduct-input"
          type="text"
          name="address"
          value={staffInfo.address}
          onChange={onChangeHandler}
        />
      </section>

      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleModalAdd}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddStaff;
