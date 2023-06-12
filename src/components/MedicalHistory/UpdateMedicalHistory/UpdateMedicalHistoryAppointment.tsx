import { useLocation } from "react-router-dom";
import { getAppointmentInterface } from "../../../types/Types";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { Close, Check } from "@mui/icons-material";
import { toast } from "react-toastify";

const UpdateMedicalHistoryAppointment = ({
  toggleModalUpdate,
  paramsId,
}: any) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useQuery<getAppointmentInterface>({
    queryKey: ["UpdateMedicalHistoryAppointment"],
    queryFn: async () =>
      await axios
        .get(
          `${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/${paramsId}`
        )
        .then((res) => res.data),
  });

  const [addAppointmentInfo, setAddAppointmentInfo] =
    useState<getAppointmentInterface>({
      _id: "",
      petId: "",
      appointmentDate: new Date(),
      veterinarian: "",
      medicalConditions: "",
      medications: "",
      allergies: "",
      medicalNotes: "",
    });

  useEffect(() => {
    setAddAppointmentInfo({
      _id: data?._id || "",
      petId: data?.petId || "",
      appointmentDate: data?.appointmentDate || new Date(),
      veterinarian: data?.veterinarian || "",
      medicalConditions: data?.medicalConditions || "",
      medications: data?.medications || "",
      allergies: data?.allergies || "",
      medicalNotes: data?.medicalNotes || "",
    });
  }, [paramsId, data]);

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
      await axios.put(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/medicalHistory/update/${paramsId}`,
        {
          ...addAppointmentInfo,
        }
      );
      toast.success("Sucessfully updated Medical history and appointment!", {
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

export default UpdateMedicalHistoryAppointment;
