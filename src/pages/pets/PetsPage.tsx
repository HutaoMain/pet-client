import "./PetsPage.css";
import axios from "axios";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Add,
  Delete,
  ModeEdit,
  Search,
  ManageSearch,
} from "@mui/icons-material";
import {
  confirmationModalCustomStyle,
  productCustomStyle,
} from "../../ZCustomStyle/CustomStyle";
import AddPet from "../../components/PetComponents/AddPet/AddPet";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getPetInterface } from "../../types/Types";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import UpdatePet from "../../components/PetComponents/UpdatePet/UpdatePet";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

Modal.setAppElement("#root");

const PetsPage = () => {
  const { data } = useQuery<getPetInterface[]>({
    queryKey: ["petsPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/pet/list`)
        .then((res) => res.data),
  });

  const [list, setList] = useState<getPetInterface[]>();
  const [openView, setOpenView] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [paramsId, setParamsId] = useState<string>("");

  const toggleModalView = (id: any) => {
    setParamsId(id);
    setOpenView(!openView);
  };

  const toggleModalUpdate = (id: any) => {
    setParamsId(id);
    setOpenUpdate(!openUpdate);
  };

  const toggleModalDelete = (id: any) => {
    setParamsId(id);
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/pet/delete/${id}`
      );

      setList(list?.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const orderColumn: GridColDef[] = [
    {
      field: "petName",
      headerName: "petName",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "gender",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "weight",
      headerName: "weight",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "owner",
      headerName: "owner",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
            <button
              className="action-btn view"
              onClick={() => toggleModalView(params.row._id)}
            >
              <ManageSearch />
              View
            </button>

            <button
              className="action-btn edit"
              onClick={() => toggleModalUpdate(params.row._id)}
            >
              <ModeEdit />
              Edit
            </button>

            <button
              className="action-btn delete"
              onClick={() => toggleModalDelete(params.row._id)}
            >
              <Delete />
              Delete
            </button>
            <Modal
              isOpen={isAddModalOpen}
              onRequestClose={toggleAddModal}
              style={productCustomStyle}
            >
              <AddPet toggleAddModal={toggleAddModal} />
            </Modal>
            <Modal
              isOpen={openDelete}
              onRequestClose={toggleModalDelete}
              style={confirmationModalCustomStyle}
              contentLabel="My dialog"
            >
              <Confirmation
                action="delete"
                whatItem="category"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleModalDelete}
              />
            </Modal>
            <Modal
              isOpen={openUpdate}
              onRequestClose={toggleModalUpdate}
              style={confirmationModalCustomStyle}
              contentLabel="My dialog"
            >
              <UpdatePet
                toggleModalUpdate={toggleModalUpdate}
                paramsId={paramsId}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return (
      item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.petName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0",
          margin: "20px 0",
        }}
      >
        <InputBase
          placeholder="Search by Pet Name or Owner Name"
          value={searchTerm}
          onChange={handleSearch}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
        <button className="add-category-btn" onClick={toggleAddModal}>
          Add Pet <Add />
        </button>
      </div>

      <section className="category-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={orderColumn}
          getRowId={(row) => row._id}
        />
      </section>
    </div>
  );
};

export default PetsPage;
