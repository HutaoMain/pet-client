import "./CategoryPage.css";
import SearchBar from "../../components/search/SearchBar";
import Modal from "react-modal";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit } from "@mui/icons-material";
import {
  categoryCustomStyle,
  confirmationModalCustomStyle,
} from "../../ZCustomStyle/CustomStyle";
import AddCategory from "../../components/CategoryComponents/addCategory/AddCategory";
import { CategoryInterface } from "../../types/Types";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import axios from "axios";
import UpdateCategory from "../../components/CategoryComponents/updateCategory/UpdateCategory";

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

  return (
    <div className="category-page">
      <SearchBar />
      <button className="add-category-btn" onClick={toggleAddCategory}>
        Add Category <Add />
      </button>
      <section className="category-page-datagrid">
        {data ? (
          <DataGrid
            rows={data ?? []}
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
