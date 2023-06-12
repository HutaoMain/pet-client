import "./StaffPage.css";
import axios from "axios";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add, Delete, ModeEdit } from "@mui/icons-material";
import { getStaffInterface } from "../../types/Types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  confirmationModalCustomStyle,
  staffModalCustomStyle,
} from "../../ZCustomStyle/CustomStyle";
import Confirmation from "../../components/ConfirmationModal/Confirmation";
import UpdateStaff from "../../components/StaffComponents/UpdateStaff/UpdateStaff";
import AddStaff from "../../components/StaffComponents/AddStaff/AddStaff";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

Modal.setAppElement("#root");

const StaffPage = () => {
  const { data } = useQuery<getStaffInterface[]>({
    queryKey: ["staffPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/staff/list`)
        .then((res) => res.data),
  });

  const [list, setList] = useState<getStaffInterface[]>();

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [paramsId, setParamsId] = useState<string>("");

  const toggleModalAdd = (id: any) => {
    setParamsId(id);
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
        `${import.meta.env.VITE_APP_API_URL}/api/staff/delete/${id}`
      );

      setList(list?.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const orderColumn: GridColDef[] = [
    {
      field: "employeeName",
      headerName: "Employee Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // Do dropdown here
    },
    {
      field: "gender",
      headerName: "Gender",
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
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            {/* <button className="action-btn view">
              <ManageSearch />
              View
            </button> */}

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

  const filteredStaff = data?.filter((staff) => {
    return (
      staff.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
          placeholder="Search by Employee Name or Employee ID"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "400px", border: "2px solid black", padding: "0 20px" }}
          endAdornment={
            <IconButton>
              <SearchIcon />
            </IconButton>
          }
        />
        <button className="add-category-btn" onClick={toggleModalAdd}>
          Add Staff <Add />
        </button>
      </div>
      <section className="category-page-datagrid">
        <DataGrid
          rows={filteredStaff ?? []}
          columns={orderColumn}
          getRowId={(row) => row._id}
        />
      </section>
      <Modal
        isOpen={openAdd}
        onRequestClose={toggleModalAdd}
        style={staffModalCustomStyle}
      >
        <AddStaff toggleModalAdd={toggleModalAdd} />
      </Modal>

      <Modal
        isOpen={openUpdate}
        onRequestClose={toggleModalUpdate}
        style={staffModalCustomStyle}
        contentLabel="My dialog"
      >
        <UpdateStaff
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

export default StaffPage;
