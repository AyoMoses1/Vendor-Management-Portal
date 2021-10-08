import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import { getSellerById } from "./SellerService";

const SellerInfo = ({ id }) => {
  const [state, setState] = useState([]);
  console.log(id);
  useEffect(() => {
    getSellerById(id).then(({ data }) => {
      console.log(data.object);
      setState(data.object);
      console.log(state);
    });
  }, [id]);

  return (
    <SimpleCard className="pt-6">
      <div className="flex-column items-center mb-6">
        <h5 className="mt-4 mb-2">{state.name}</h5>
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>
          <TableRow>
            <TableCell className="pl-4">Email</TableCell>
            <TableCell>
              <div>{state.email}</div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4">Phone Number</TableCell>
            <TableCell>
              <div>{state.mobileNo}</div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4">City</TableCell>
            <TableCell>
              <div>{state.city}</div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4">State</TableCell>
            <TableCell>
              <div>{state.state}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Address</TableCell>
            <TableCell>
              <div>{state.address || "-----"}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Country</TableCell>
            <TableCell>
              <div>{state.country}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SimpleCard>
  );
};

export default SellerInfo;
