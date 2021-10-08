import React, {useState} from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import EditUser from "./EditUser"

const fields = [
  "username",
  "email",
]

const StaffList = ({staff}) => {
  const [isOpen, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Staff</TableCell>
            {/* <TableCell className="px-0">Seller</TableCell> */}
            <TableCell className="px-0">Name</TableCell>
            <TableCell className="px-0">Email</TableCell>
            <TableCell className="px-0" align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="px-0" align="left">
                {data.username}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
              { data.firstName && data.lastName !== null ? `${data.firstName} ${data.lastName}` : "-----"}
              </TableCell>
              <TableCell className="px-0">
               { data.email !== null ? data.email : "----"}
              </TableCell>
              <TableCell className="px-0" align="center">
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
                <EditUser staff={staff} isOpen={isOpen} handleClose={handleClose} name="Edit Staff" fields={fields}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffList;
