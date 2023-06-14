import React, { useState } from "react";
import { addPetInterface } from "../../../types/Types";
import { Check, Close } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const AddPet = ({ toggleAddModal }: any) => {
  const [addPetInfo, setAddPetInfo] = useState<addPetInterface>({
    petName: "",
    gender: "",
    weight: "",
    owner: "",
    ownerEmail: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAddPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/pet/create`, {
        ...addPetInfo,
      });
      toast.success("Sucessfully added pet!", {
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
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Product</div>
      <hr style={{ marginBottom: "20px" }} />

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Pet Name</label>
        <input
          className="addproduct-input"
          type="text"
          name="petName"
          value={addPetInfo.petName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Pet Gender</label>
        <select
          className="addproduct-input"
          name="gender"
          value={addPetInfo.gender}
          onChange={onChangeHandler}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Weight</label>
        <input
          className="addproduct-input"
          type="text"
          name="weight"
          value={addPetInfo.weight}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner</label>
        <input
          className="addproduct-input"
          type="text"
          name="owner"
          value={addPetInfo.owner}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner Email</label>
        <input
          className="addproduct-input"
          type="text"
          name="ownerEmail"
          value={addPetInfo.ownerEmail}
          onChange={onChangeHandler}
        />
      </section>

      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleAddModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddPet;
