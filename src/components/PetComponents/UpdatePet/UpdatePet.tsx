import React, { useState, useEffect } from "react";
import { addPetInterface, getPetInterface } from "../../../types/Types";
import { Check, Close } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const UpdatePet = ({ toggleModalUpdate, paramsId }: any) => {
  const [petInfo, setPetInfo] = useState<addPetInterface>({
    petName: "",
    gender: "",
    weight: "",
    owner: "",
    ownerEmail: "",
  });

  const { data } = useQuery<getPetInterface>({
    queryKey: ["updatePet"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/pet/${paramsId}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setPetInfo({
      petName: data?.petName || "",
      gender: data?.gender || "",
      weight: data?.weight || "",
      owner: data?.owner || "",
      ownerEmail: data?.ownerEmail || "",
    });
  }, [paramsId, data]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/pet/update/${paramsId}`,
        {
          ...petInfo,
        }
      );
      toast.success("Sucessfully updated pet!", {
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
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Update Pet</div>
      <hr style={{ marginBottom: "20px" }} />

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Pet Name</label>
        <input
          className="addproduct-input"
          type="text"
          name="petName"
          value={petInfo.petName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Pet Gender</label>
        <select name="gender" value={petInfo.gender} onChange={onChangeHandler}>
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
          value={petInfo.weight}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner</label>
        <input
          className="addproduct-input"
          type="text"
          name="owner"
          value={petInfo.owner}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner Email</label>
        <input
          className="addproduct-input"
          type="text"
          name="ownerEmail"
          value={petInfo.ownerEmail}
          onChange={onChangeHandler}
        />
      </section>

      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleModalUpdate}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default UpdatePet;
