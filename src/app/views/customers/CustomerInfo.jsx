import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { SimpleCard, Breadcrumb } from "matx";
import { getCustomerById } from "./CustomerService";

const CustomerInfo = ({ location }) => {
  const { id } = location.state;
  const [customer, setCustomer] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  useEffect(() => {
    getCustomerById(id).then(({ data }) => {
      console.log(data.object);
      setCustomer(data.object);
      setCustomerInfo(data.object.deliveryAddresses);
      console.log(customer);
    });
  }, [id]);
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Customers", path: "/customers" },
            { name: "View Customer" },
          ]}
        />
      </div>

      <SimpleCard>
        <div className="flex-column items-center mb-6">
          <h5 className="mt-4 mb-2">{`${customer.firstName} ${customer.lastName}`}</h5>
        </div>

        <Divider />
        <Table className="mb-4">
          <TableBody>
            <TableRow>
              <TableCell className="pl-4">Email</TableCell>
              <TableCell>
                <div>{customer.email}</div>
                {/* <small className="px-1 py-2px bg-light-green text-green border-radius-4">
                EMAIL VERIFIED
              </small> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Phone Number</TableCell>
              <TableCell>
                <div>{customer.mobileNo}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">State</TableCell>
              <TableCell>
                <div>{customer.state}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Country</TableCell>
              <TableCell>
                <div>{customer.country}</div>
              </TableCell>
            </TableRow>
            {customerInfo.map((item, ind) => (
              <TableRow key={ind}>
                <TableCell className="pl-4">{`Address ${ind + 1}`}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SimpleCard>
      {/* <br />
      <SimpleCard>
        <div className="flex-column items-center mb-6">
          <h5 className="mt-4 mb-2">WishList</h5>
        </div>
        <Table className="mb-4">
          <TableBody>{
              customer.wishlist.map((item, ind)=>(
                  <TableRow key={ind}>
                        <TableCell>
                            
                        </TableCell>
                  </TableRow>
              ))
}</TableBody>
        </Table>
      </SimpleCard> */}
    </div>
  );
};

export default CustomerInfo;
