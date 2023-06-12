import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import CategoryPage from "./pages/category/CategoryPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductPage from "./pages/product/ProductPage";
import PetsPage from "./pages/pets/PetsMainPage/PetsPage";
import AppointmentPage from "./pages/appointment/AppointmentPage";
import StaffPage from "./pages/staff/StaffPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ViewPet from "./pages/pets/ViewPet/ViewPet";

function App() {
  return (
    <div className="App">
      <section className="app-sidebar">
        <Sidebar />
      </section>
      <section className="App-container">
        <Routes>
          <Route path="" element={<DashboardPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="pets" element={<PetsPage />} />
          <Route path="appointments" element={<AppointmentPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="pets/:id" element={<ViewPet />} />
        </Routes>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
