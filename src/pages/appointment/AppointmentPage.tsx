import React, { useState } from "react";
import "./AppointmentPage.css";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Search, Add, ModeEdit, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import Modal from "react-modal";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import axios from "axios";
import { getAppointmentInterface } from "../../types/Types";
import {
  confirmationModalCustomStyle,
  staffModalCustomStyle,
} from "../../ZCustomStyle/CustomStyle";
import UpdateAppointment from "../../components/AppointmentComponents/UpdateAppointment/UpdateAppointment";
import { useQuery } from "react-query";
import AddAppointment from "../../components/AppointmentComponents/AddAppointment/AddAppointment";

Modal.setAppElement("#root");

const AppointmentPage = () => {
  const { data } = useQuery<getAppointmentInterface[]>({
    queryKey: ["appointmentPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/appointment/list`)
        .then((res) => res.data),
  });

  const [list, setList] = useState<getAppointmentInterface[]>();
  const [paramsId, setParamsId] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const toggleModalUpdate = (id: any) => {
    setParamsId(id);
    setOpenUpdate(!openUpdate);
  };

  const toggleModalDelete = (id: any) => {
    setParamsId(id);
    setOpenDelete(!openDelete);
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/delete/${id}`
      );

      setList(list?.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const orderColumn: GridColDef[] = [
    {
      field: "petName",
      headerName: "Pet Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ownerName",
      headerName: "Owner Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
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
      valueFormatter: (params) =>
        moment(params.value).format("DD/MM/YYYY hh:mm A"),
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
          </div>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppointments = data?.filter((appointment) => {
    return (
      appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleModalAdd = () => {
    setOpenAdd(!openAdd);
  };

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
        <button className="add-category-btn" onClick={toggleModalAdd}>
          Add Appointment <Add />
        </button>
      </div>
      <section className="category-page-datagrid">
        <DataGrid
          rows={filteredAppointments ?? []}
          columns={orderColumn}
          getRowId={(row) => row._id}
        />
      </section>

      <Modal
        isOpen={openAdd}
        onRequestClose={toggleModalAdd}
        style={staffModalCustomStyle}
        contentLabel="My dialog"
      >
        <AddAppointment toggleModalAdd={toggleModalAdd} paramsId={paramsId} />
      </Modal>

      <Modal
        isOpen={openUpdate}
        onRequestClose={toggleModalUpdate}
        style={staffModalCustomStyle}
        contentLabel="My dialog"
      >
        <UpdateAppointment
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
};

export default AppointmentPage;
