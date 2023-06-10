import "./StaffPage.css";
import axios from "axios";
import SearchBar from "../../components/search/SearchBar";

import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit, ManageSearch } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StaffPage = () => {
  const { data } = useQuery<[]>({
    queryKey: ["petsPage"],
    queryFn: () =>
      axios
        // .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .get(`https://mocki.io/v1/3e266c30-759f-48ca-8d64-a78178a15ab1`)
        .then((res) => res.data),
  });

  const orderColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "petName",
      headerName: "petName",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "gender",
      headerName: "gender",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "weight",
      headerName: "weight",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "owner",
      headerName: "owner",
      headerAlign: "center",
      align: "center",
      width: 200,
      // Do dropdown here
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            <Link
              style={{ textDecoration: "none" }}
              to={`/orders/${params.row.id}`}
            >
              <button className="action-btn view">
                <ManageSearch />
                View
              </button>
            </Link>
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
    <div>
      {" "}
      <SearchBar />
      <button className="add-category-btn">
        Add Product <Add />
      </button>
      <section className="category-page-datagrid">
        <DataGrid rows={data ?? []} columns={orderColumn} />
      </section>
    </div>
  );
};

export default StaffPage;
