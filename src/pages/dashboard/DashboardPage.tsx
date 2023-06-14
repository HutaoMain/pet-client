import "./DashboardPage.css";
import axios from "axios";
import { useQuery } from "react-query";
import { getMonthlyData } from "../../types/Types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import NumberOfPets from "../../components/DashboardComponent/NumberOfPets";
import NumberOfAppointments from "../../components/DashboardComponent/NumberOfAppointments";
import NumberOfStaffs from "../../components/DashboardComponent/NumberOfStaffs";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const DashboardPage = () => {
  const { data } = useQuery<getMonthlyData[]>({
    queryKey: ["DashboardPage"],
    queryFn: () =>
      axios
        .get(
          `${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/monthly/data`
        )
        .then((res) => res.data),
  });

  const chartData = {
    labels: data?.map((item) => item._id),

    datasets: [
      {
        label: "Appointment Counts per Month",
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
        borderWidth: 1,
        hoverBackgroundColor: "#757de8",
        hoverBorderColor: "#757de8",
        data: data?.map((item) => item.count),
      },
    ],
  };

  return (
    <div className="dashboard category-page">
      <NumberOfPets />
      <NumberOfAppointments />
      <NumberOfStaffs />

      <div className="widget">
        <div className="widget-header">
          <h3>Chart</h3>
        </div>
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
