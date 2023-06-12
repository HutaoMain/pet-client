import { useState } from "react";
import { addAppointmentInterface } from "../../../types/Types";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { toast } from "react-toastify";
import { Check, Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const AddMedicalHistoryAppointment = ({ toggleAddModal }: any) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [addAppointmentInfo, setAddAppointmentInfo] =
    useState<addAppointmentInterface>({
      petId: id || "",
      appointmentDate: new Date(),
      veterinarian: "",
      medicalConditions: "",
      medications: "",
      allergies: "",
      medicalNotes: "",
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
        `${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/create`,
        {
          ...addAppointmentInfo,
          petId: id,
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
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Appointment</div>
      <hr style={{ marginBottom: "20px" }} />

      <section
        className="addproduct-item-list"
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <label>Appointment Date</label>
        <DateTimePicker
          value={addAppointmentInfo.appointmentDate}
          name="appointmentDate"
          onChange={onDateTimeChangeHandler}
          format="yyyy-MM-dd HH:mm:ss" // Set the desired date format
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Veterinarian</label>
        <input
          className="addproduct-input"
          type="text"
          name="veterinarian"
          value={addAppointmentInfo.veterinarian}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Medical Conditions</label>
        <input
          className="addproduct-input"
          type="text"
          name="medicalConditions"
          value={addAppointmentInfo.medicalConditions}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Medications</label>
        <input
          className="addproduct-input"
          type="text"
          name="medications"
          value={addAppointmentInfo.medications}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Allergies</label>
        <input
          className="addproduct-input"
          type="text"
          name="allergies"
          value={addAppointmentInfo.allergies}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Medical Notes</label>
        <input
          className="addproduct-input"
          type="text"
          name="medicalNotes"
          value={addAppointmentInfo.medicalNotes}
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

export default AddMedicalHistoryAppointment;
