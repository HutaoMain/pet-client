import "./CategoryPage.css";
import SearchBar from "../../components/search/SearchBar";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { data } = useQuery<[]>({
    queryKey: ["categoryPage"],
    queryFn: () =>
      axios
        // .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .get(`https://mocki.io/v1/ec418f5a-1cde-477d-bc26-2c330cf1b571`)
        .then((res) => res.data),
  });

  const orderColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "categoryName",
      headerName: "categoryName",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            <Link
              style={{ textDecoration: "none" }}
              to={`/orders/${params.row.id}`}
            >
              <button className="action-btn edit">
                <ModeEdit />
                Edit
              </button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/orders/${params.row.id}`}
            >
              <button className="action-btn delete">
                <Delete />
                Delete
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="category-page">
      <SearchBar />
      <button className="add-category-btn">
        Add Category <Add />
      </button>
      <section className="category-page-datagrid">
        <DataGrid rows={data ?? []} columns={orderColumn} />
      </section>
    </div>
  );
};

export default CategoryPage;
