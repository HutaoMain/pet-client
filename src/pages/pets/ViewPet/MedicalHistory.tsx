import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ModeEdit, Delete, Search, Add } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  confirmationModalCustomStyle,
  staffModalCustomStyle,
} from "../../../ZCustomStyle/CustomStyle";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { getMedicalHistory } from "../../../types/Types";
import Confirmation from "../../../components/ConfirmationModal/Confirmation";
import AddMedicalHistoryAppointment from "../../../components/MedicalHistory/AddMedicalHistory/AddMedicalHistoryAppointment";
import UpdateMedicalHistoryAppointment from "../../../components/MedicalHistory/UpdateMedicalHistory/UpdateMedicalHistoryAppointment";

const MedicalHistory = () => {
  const { data } = useQuery<getMedicalHistory[]>({
    queryKey: ["MedicalHistory"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/list`)
        .then((res) => res.data),
  });

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [list, setList] = useState<getMedicalHistory[]>();
  const [paramsId, setParamsId] = useState<string>("");

  const toggleAddModal = () => {
    setOpenAdd(!openAdd);
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
        `${import.meta.env.VITE_APP_API_URL}/api/medicalHistory/delete/${id}`
      );

      setList(list?.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const medicalHistory: GridColDef[] = [
    {
      field: "petId",
      headerName: "Pet ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "veterinarian",
      headerName: "Veterinarian",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "medicalConditions",
      headerName: "Medical Conditions",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "medications",
      headerName: "Medications",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "allergies",
      headerName: "Allergies",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "medicalNotes",
      headerName: "Medical Notes",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
              isOpen={openUpdate}
              onRequestClose={toggleModalUpdate}
              style={staffModalCustomStyle}
              contentLabel="My dialog"
            >
              <UpdateMedicalHistoryAppointment
                toggleModalUpdate={toggleModalUpdate}
                paramsId={paramsId}
              />
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
    return (
      item?.petId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.veterinarian?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.appointmentDate?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="medical-history">
      <h1>Medical History and Appointments</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0",
          margin: "20px",
        }}
      >
        <InputBase
          placeholder="Search by Pet ID, Veterinarian or Appointment Date"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "400px", border: "2px solid black", padding: "0 20px" }}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
        <button className="add-category-btn" onClick={toggleAddModal}>
          Add Appointment <Add />
        </button>
      </div>
      <section className="medical-history-grid">
        <DataGrid
          columns={medicalHistory}
          rows={filtered || []}
          getRowId={(row) => row._id}
        />
      </section>
      <Modal
        isOpen={openAdd}
        onRequestClose={toggleAddModal}
        style={staffModalCustomStyle}
        contentLabel="My dialog"
      >
        <AddMedicalHistoryAppointment toggleAddModal={toggleAddModal} />
      </Modal>
    </div>
  );
};

export default MedicalHistory;
