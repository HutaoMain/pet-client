import "./ProductPage.css";
import SearchBar from "../../components/search/SearchBar";
import axios from "axios";
import Modal from "react-modal";
import AddProduct from "../../components/addProduct/AddProduct";

import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { productCustomStyle } from "../../ZCustomStyle/CustomStyle";

Modal.setAppElement("#root");

const ProductPage = () => {
  const { data } = useQuery<[]>({
    queryKey: ["productPage"],
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
      field: "productName",
      headerName: "productName",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "description",
      headerName: "description",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "category",
      headerName: "category",
      headerAlign: "center",
      align: "center",
      width: 200,
      // Do dropdown here
    },
    {
      field: "quantity",
      headerName: "quantity",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "vendorPrice",
      headerName: "vendorPrice",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "retailPrice",
      headerName: "retailPrice",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "vendor",
      headerName: "vendor",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "status",
      headerName: "status",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 300,
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

  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  return (
    <div className="category-page">
      <SearchBar />
      <button className="add-category-btn" onClick={toggleProductModal}>
        Add Product <Add />
      </button>
      <section className="category-page-datagrid">
        <DataGrid rows={data ?? []} columns={orderColumn} />
      </section>
      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={toggleProductModal}
        style={productCustomStyle}
      >
        <AddProduct toggleProductModal={toggleProductModal} />
      </Modal>
    </div>
  );
};

export default ProductPage;
