import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import { useQuery } from "react-query";
import { getStaffInterface } from "../../types/Types";

const NumberOfStaffs = () => {
  const { data } = useQuery<getStaffInterface[]>({
    queryKey: ["NumberOfStaff"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/staff/list`)
        .then((res) => res.data),
  });

  return (
    <div className="widget">
      <div className="widget-header">
        <PeopleIcon className="widget-icon" />
        <h3>Staff</h3>
      </div>
      {data ? <h2>{data?.length}</h2> : "loading"}
    </div>
  );
};

export default NumberOfStaffs;
