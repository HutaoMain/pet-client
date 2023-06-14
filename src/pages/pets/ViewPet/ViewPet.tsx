import axios from "axios";
import { getPetInterface } from "../../../types/Types";
import "./ViewPet.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import MedicalHistory from "./MedicalHistory";

const ViewPet = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useQuery<getPetInterface>({
    queryKey: ["ViewPet"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/pet/${id}`)
        .then((res) => res.data),
  });

  return (
    <div className="viewpet">
      <div className="viewpet-basicinfo">
        <h2>Basic Info</h2>
        <label>
          Pet Name:
          <span
            style={{
              textDecoration: "underline",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            {data?.petName}
          </span>
        </label>
        <label>
          Gender:
          <span
            style={{
              textDecoration: "underline",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            {data?.gender}
          </span>
        </label>
        <label>
          Weight:
          <span
            style={{
              textDecoration: "underline",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            {data?.weight}
          </span>
        </label>
        <label>
          Owner:
          <span
            style={{
              textDecoration: "underline",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            {data?.owner}
          </span>
        </label>
        <label>
          Owner Email Address:
          <span
            style={{
              textDecoration: "underline",
              paddingLeft: "10px",
              fontSize: "18px",
            }}
          >
            {data?.ownerEmail}
          </span>
        </label>
      </div>
      <MedicalHistory />
    </div>
  );
};

export default ViewPet;
