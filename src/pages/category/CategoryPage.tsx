import "./CategoryPage.css";
import Modal from "react-modal";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit, Search } from "@mui/icons-material";
import {
  categoryCustomStyle,
  confirmationModalCustomStyle,
} from "../../ZCustomStyle/CustomStyle";
import AddCategory from "../../components/CategoryComponents/addCategory/AddCategory";
import { CategoryInterface } from "../../types/Types";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import axios from "axios";
import UpdateCategory from "../../components/CategoryComponents/updateCategory/UpdateCategory";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

const CategoryPage = () => {
  const { data } = useQuery<CategoryInterface[]>("categoryPage", () =>
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/category/list`).then((res) =>
      res.json()
    )
  );

  const [paramsId, setParamsId] = useState<string>("");
  const [list, setList] = useState<CategoryInterface[]>();

  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  const [isCategoryUpdate, setIsCategoryUpdate] = useState<boolean>(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const toggleModalUpdateCategory = (id: any) => {
    setParamsId(id);
    setIsCategoryUpdate(!isCategoryUpdate);
  };

  const toggleAddCategory = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const toggleConfimationModal = (id: any) => {
    console.log("logging id", id);
    setParamsId(id);
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/category/delete/${id}`
      );

      setList(list?.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const categoryColumn: GridColDef[] = [
    {
      field: "_id",
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
            <button
              className="action-btn edit"
              onClick={() => toggleModalUpdateCategory(params.row._id)}
            >
              <ModeEdit />
              Edit
            </button>

            <button
              className="action-btn delete"
              onClick={() => toggleConfimationModal(params.row._id)}
            >
              <Delete />
              Delete
            </button>
            <Modal
              isOpen={isConfirmationOpen}
              onRequestClose={toggleConfimationModal}
              style={confirmationModalCustomStyle}
              contentLabel="My dialog"
            >
              <Confirmation
                action="delete"
                whatItem="category"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleConfimationModal}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return item.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="category-page">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0",
          marginTop: "20px",
        }}
      >
        <InputBase
          placeholder="Search by Category Name"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "400px", border: "2px solid black", padding: "0 20px" }}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
        <button className="add-category-btn" onClick={toggleAddCategory}>
          Add Category <Add />
        </button>
      </div>

      <section className="category-page-datagrid">
        {data ? (
          <DataGrid
            rows={filtered ?? []}
            columns={categoryColumn}
            getRowId={(row) => row._id}
          />
        ) : (
          "loading"
        )}
      </section>
      <Modal
        isOpen={isCategoryModalOpen}
        onRequestClose={toggleAddCategory}
        style={categoryCustomStyle}
      >
        <AddCategory toggleCategoryModal={toggleAddCategory} />
      </Modal>
      {/* update modal */}
      <Modal
        isOpen={isCategoryUpdate}
        onRequestClose={toggleModalUpdateCategory}
        style={categoryCustomStyle}
      >
        <UpdateCategory
          toggleModalUpdateCategory={toggleModalUpdateCategory}
          paramsId={paramsId}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
