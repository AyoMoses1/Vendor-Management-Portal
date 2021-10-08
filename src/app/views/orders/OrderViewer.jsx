import React, { useState, useEffect } from "react";
import {
  Icon,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById } from "./OrderService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, *, html": {
        visibility: "hidden",
      },
      "#print-area": {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        "& *": {
          visibility: "visible",
        },
      },
    },
  },
  orderViewer: {
    "& h5": {
      fontSize: 15,
    },
    paddingBottom: "4px",
  },
  viewerAction: {
    justifyContent: "space-between !important",
    display: "flex",
    marginTop: "10px",
    marginBottom: "2px",
    paddingLeft: "4px",
    paddingRight: "4px",
  },
  tableBottom: {
    display: "flex",
    justifyContent: "flex-end !important",
  },
}));

const OrderViewer = ({ toggleOrderEditor, id }) => {
  const [state, setState] = useState({});

  const classes = useStyles();

  useEffect(() => {
    if (id !== "add")
      getInvoiceById(id).then((res) => {
        console.log(res.data);
        setState({ ...res.data.object });
      });
  }, [id]);

  const handlePrint = () => window.print();

  let subTotalCost = 0;
  let {
    referenceNo,
    buyer,
    customerId,
    status,
    vat,
    createDate,
    totalDiscount,
    subTotal,
    deliveryAddress,
    shippingMethod,
  } = state;

  return (
    <>
      <div className={clsx("invoice-viewer py-4", classes.orderViewer)}>
        <div
          className={clsx(
            "viewer_actions px-4 mb-5 flex items-center",
            classes.viewerAction
          )}
        >
          <Link to="/orders">
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <div>
            <Button
              className="mr-4 py-2"
              variant="contained"
              color="primary"
              onClick={() => toggleOrderEditor()}
            >
              Edit Order
            </Button>
            <Button
              onClick={handlePrint}
              className="py-2"
              variant="contained"
              color="secondary"
            >
              Print Order
            </Button>
          </div>
        </div>

        <div id="print-area">
          <div
            className={clsx(
              "viewer_actions px-4 mb-5 flex items-center justify-between",
              classes.viewerAction
            )}
          >
            <div>
              <h5 className="mb-2">Order Info</h5>
              <p className="mb-4">Reference Number</p>
              <p className="mb-0"># {referenceNo}</p>
            </div>
            <div className="text-right">
              <h5 className="font-normal mb-4 capitalize">
                <strong>Order status:</strong> {status}
              </h5>
              <h5 className="font-normal capitalize">
                <strong>Order date: </strong>{" "}
                <span>
                  {createDate
                    ? format(new Date(createDate).getTime(), "MMMM dd, yyyy")
                    : ""}
                </span>
              </h5>
            </div>
          </div>

          <Divider />

          <div
            className={clsx(
              "viewer__billing-info px-4 py-5 flex justify-between",
              classes.viewerAction
            )}
          > 
            <div>
            <h5 className="mb-2">Customer Details</h5>
              <p className="mb-4">
                {customerId
                  ? `${customerId.firstName} ${customerId.lastName}`
                  : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                {customerId ? customerId.mobileNo : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                {customerId ? customerId.email : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                {deliveryAddress ? deliveryAddress?.address : null}
              </p>
      
            </div>
            <div className="text-right w-full">
              <h5 className="mb-2">Shipping Details</h5>
              <p className="mb-4">
                {customerId
                  ? `${customerId.firstName} ${customerId.lastName}`
                  : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                {customerId ? customerId.email : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                {deliveryAddress ? deliveryAddress?.address : null}
              </p>
              <p className="mb-0 whitespace-pre-wrap">
                Shipping Method: {shippingMethod ? shippingMethod : null}
              </p>
            </div>
            <div />
          </div>

          {/* <Card className="mb-4" elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="pl-sm-24">#</TableCell>
                  <TableCell className="px-0">Item Name</TableCell>
                  <TableCell className="px-0">Unit Price</TableCell>
                  <TableCell className="px-0">Unit</TableCell>
                  <TableCell className="px-0">Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceItemList.map((item, index) => {
                  subTotalCost += item.itemQuantity * item.itemPrice;
                  return (
                    <TableRow key={index}>
                      <TableCell className="pl-sm-24 capitalize" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {item.productId.name}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {item.itemPrice}
                      </TableCell>
                      <TableCell className="pl-0 capitalize">
                        {item.itemQuantity}
                      </TableCell>
                      <TableCell className="pl-0">
                        {item.itemQuantity * item.itemPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card> */}

          {/* <div className={clsx("px-4", classes.tableBottom)}>
            <div className="flex">
              <div className="pr-12">
                <p className="mb-4">Sub Total:</p>
                <p className="mb-4">Vat(%):</p>
                <strong>
                  <p>Grand Total:</p>
                </strong>
              </div>
              <div>
                <p className="mb-4">{subTotal}</p>
                <p className="mb-4">{totalDiscount}</p>
                <p>
                  <strong>₦{subTotal}</strong>
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default OrderViewer;
