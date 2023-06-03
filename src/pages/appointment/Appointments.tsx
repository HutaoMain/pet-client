import "./Appointment.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import moment from "moment";

const Appointments = () => {
  return (
    // sorting
    //search
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Pet ID</TableCell>
            <TableCell className="tableCell">Pet Name</TableCell>
            <TableCell className="tableCell">Owner Name</TableCell>
            <TableCell className="tableCell">Appointment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {loading
          ? "Loading"
          : data.map((item) => ( */}
          <TableRow>
            <TableCell className="tableCell">id</TableCell>
            <TableCell className="tableCell">name</TableCell>
            <TableCell className="tableCell">owner name</TableCell>
            <TableCell className="tableCell">
              {/* {[
                      moment(item?.dateRange[0].startDate).format("YYYY-MM-DD"),
                      <br />,
                      "to",
                      <br />,
                      moment(item?.dateRange[0].endDate).format("YYYY-MM-DD"),
                    ]} */}
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
