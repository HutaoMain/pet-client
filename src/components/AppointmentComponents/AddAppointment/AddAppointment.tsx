import { useState } from "react";
import { addAppointmentInterface } from "../../../types/Types";
import axios from "axios";
import { toast } from "react-toastify";
import { Check, Close } from "@mui/icons-material";
import DateTimePicker from "react-datetime-picker";

const AddAppointment = ({ toggleModalAdd }: any) => {
  const [addAppointmentInfo, setAddAppointmentInfo] =
    useState<addAppointmentInterface>({
      petName: "",
      ownerName: "",
      description: "",
      appointmentDate: new Date(),
    });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAddAppointmentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDateTimeChangeHandler = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setAddAppointmentInfo((prevState) => ({
        ...prevState,
        appointmentDate: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/create`,
        {
          ...addAppointmentInfo,
        }
      );
      toast.success("Sucessfully added Appointment!", {
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
          value={addAppointmentInfo.petName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner Name</label>
        <input
          className="addproduct-input"
          type="text"
          name="ownerName"
          value={addAppointmentInfo.ownerName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Description</label>
        <input
          className="addproduct-input"
          type="text"
          name="description"
          value={addAppointmentInfo.description}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Appointment Date</label>
        <DateTimePicker
          value={addAppointmentInfo.appointmentDate}
          name="appointmentDate"
          onChange={onDateTimeChangeHandler}
          format="yyyy-MM-dd HH:mm:ss" // Set the desired date format
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

export default AddAppointment;
