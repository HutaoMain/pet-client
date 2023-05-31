import { Routes, Route } from "react-router-dom";
import "./App.css";
import "react-data-grid/lib/styles.css"; //css react-data-grid
import Sidebar from "./components/sidebar/Sidebar";
import CategoryPage from "./pages/category/CategoryPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductPage from "./pages/product/ProductPage";

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
        </Routes>
      </section>
    </div>
  );
}

export default App;
