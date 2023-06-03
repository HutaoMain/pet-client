import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import CategoryPage from "./pages/category/CategoryPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductPage from "./pages/product/ProductPage";
import PetsPage from "./pages/pets/PetsPage";
import Appointments from "./pages/appointment/Appointments";
import StaffPage from "./pages/staff/StaffPage";

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
          <Route path="appointments" element={<Appointments />} />
          <Route path="staff" element={<StaffPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
