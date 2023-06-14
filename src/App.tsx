import { Routes, Route, Navigate } from "react-router-dom";
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
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import useAuthStore from "./zustand/AuthStore";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="App">
      {user ? (
        <section className="app-sidebar">
          <Sidebar />
        </section>
      ) : (
        <></>
      )}
      <section className="App-container">
        <Routes>
          <Route
            path=""
            element={user ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="categories"
            element={user ? <CategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="products"
            element={user ? <ProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="pets"
            element={user ? <PetsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="appointments"
            element={user ? <AppointmentPage /> : <Navigate to="/login" />}
          />
          <Route
            path="staff"
            element={user ? <StaffPage /> : <Navigate to="/login" />}
          />
          <Route
            path="pets/:id"
            element={user ? <ViewPet /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
