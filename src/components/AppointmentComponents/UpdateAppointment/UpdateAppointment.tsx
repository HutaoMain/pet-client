import { useState, useEffect } from "react";
import { getAppointmentInterface } from "../../../types/Types";
import { Check, Close } from "@mui/icons-material";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const UpdateAppointment = ({ toggleModalUpdate, paramsId }: any) => {
  const [appointmentInfo, setAppointmentInfo] =
    useState<getAppointmentInterface>({
      _id: "",
      petName: "",
      ownerName: "",
      description: "",
      appointmentDate: new Date(),
    });

  const { data } = useQuery<getAppointmentInterface>({
    queryKey: ["appointmentUpdate"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/appointment/${paramsId}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setAppointmentInfo({
      _id: data?._id || "",
      petName: data?.petName || "",
      ownerName: data?.ownerName || "",
      description: data?.description || "",
      appointmentDate: data?.appointmentDate || new Date(),
    });
  }, [paramsId, data]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAppointmentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDateTimeChangeHandler = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setAppointmentInfo((prevState) => ({
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
        }/api/appointment/update/${paramsId}`,
        {
          ...appointmentInfo,
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
          value={appointmentInfo.petName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Owner Name</label>
        <input
          className="addproduct-input"
          type="text"
          name="ownerName"
          value={appointmentInfo.ownerName}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Description</label>
        <input
          className="addproduct-input"
          type="text"
          name="description"
          value={appointmentInfo.description}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Appointment Date</label>
        <DateTimePicker
          value={appointmentInfo.appointmentDate}
          name="appointmentDate"
          onChange={onDateTimeChangeHandler}
          format="yyyy-MM-dd HH:mm:ss" // Set the desired date format
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

export default UpdateAppointment;
