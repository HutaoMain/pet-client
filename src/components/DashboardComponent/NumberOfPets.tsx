import PetsIcon from "@mui/icons-material/Pets";
import axios from "axios";
import { useQuery } from "react-query";
import { getPetInterface } from "../../types/Types";

const NumberOfPets = () => {
  const { data } = useQuery<getPetInterface[]>({
    queryKey: ["NumberOfPets"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/pet/list`)
        .then((res) => res.data),
  });

  return (
    <div className="widget">
      <div className="widget-header">
        <PetsIcon className="widget-icon" />
        <h3>Number of Pets</h3>
      </div>
      {data ? <h2>{data?.length}</h2> : "loading"}
    </div>
  );
};

export default NumberOfPets;
