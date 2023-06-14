import EventIcon from "@mui/icons-material/Event";
import axios from "axios";
import { useQuery } from "react-query";
import { getMedicalHistory } from "../../types/Types";

const NumberOfAppointments = () => {
  const { data } = useQuery<getMedicalHistory[]>({
    queryKey: ["NumberOfAppointments"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/list`)
        .then((res) => res.data),
  });

  return (
    <div className="widget">
      <div className="widget-header">
        <EventIcon className="widget-icon" />
        <h3>Appointments</h3>
      </div>
      {data ? <h2>{data?.length}</h2> : "loading"}
    </div>
  );
};

export default NumberOfAppointments;
