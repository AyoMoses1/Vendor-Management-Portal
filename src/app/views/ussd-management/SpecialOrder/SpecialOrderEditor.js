import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getInvoiceById, updateInvoice } from "./SpecialOrderService";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import { errorState } from "../../../views/helpers/error-state";
import Notification from "app/components/Notification";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
  viewerAction: {
    justifyContent: "space-between !important",
    display: "flex",
    marginTop: "10px",
    marginBottom: "2px",
    paddingLeft: "4px",
    paddingRight: "4px",
  },
}));

// const orderStatus = [
//   {
//     label: "Pending",
//     value: "PENDING",
//   },
//   {
//     label: "Cancelled",
//     value: "CANCELLED",
//   },
//   {
//     label: "Awaiting Payment",
//     value: "AWAITING_PAYMENT",
//   },

//   {
//     label: "Completed",
//     value: "COMPLETED",
//   },
//   {
//     label: "Converted",
//     value: "CONVERTED",
//   },
// ];


const SpecialOrderEditor = ({ isNewInvoice, toggleOrderEditor, id}) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(updatedValues);
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [error, setError] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState("");

  const history = useHistory();

  const classes = useStyles();

  let {  specialOrderNo, status, createDate, loading,  } = state;

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

  const handleChange = (event) => {
    event.persist();
    setInvoiceStatus(event.target.value);
    setState({ ...state, [event.target.name]: event.target.value });
  };
  console.log(state)
  const handleDateChange = (date) => {
    setState({ ...state, date });
  };

  const handeleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
    //setOrderStatus({ ...state, [e.target.name]: e.target.value });
  };


  const handleSubmit = () => {
    const auth = JSON.parse(localStorage.getItem("auth_user"));
    if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
      let tempState = { status: orderStatus, id: id };
      updateInvoice(tempState).then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/special-orders");
        }
      });
    } else {
      let msg = "You dont have enough permission to perform action";
      errorState(setError, setSeverity, msg);
      return;
    }
  };

  useEffect(() => {
    if (!isNewInvoice) {
      getInvoiceById(id).then(({ data }) => {
        if (isAlive) setState({ ...data.object });
      });
    } else {
      generateRandomId();
    }
  }, [id, isNewInvoice, isAlive, generateRandomId]);

  useEffect(() => {
    return () => setIsAlive(false);
  }, []);
  return (
    <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
      <Notification alert={error} severity={severity || ""} />
      <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
        <>
          <div
            className="viewer_actions px-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="mb-6">
              <Button
                type="button"
                className="mr-4 py-2"
                variant="text"
                onClick={() => toggleOrderEditor()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-2"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              "viewer__order-info px-4 mb-4 flex justify-between",
              classes.viewerAction
            )}
          >
            <div>
              <h5 className="mb-2">Special Order Info</h5>
              <p className="mb-4">Special Order Number</p>
              <TextValidator
                label="Special Order No."
                type="text"
                fullWidth
                name="specialOrderNo"
                value={specialOrderNo ? specialOrderNo : "Not set"}
                disabled
                errorMessages={["this field is required"]}
              />
            </div>
            <div>
              <FormControl component="fieldset" className="w-full mb-4">
                {/* <RadioGroup
                  aria-label="status"
                  name="status"
                  value={orderStatus}
                  onChange={handeleOrderStatus}
                ></RadioGroup> */}
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={orderStatus}
                  onChange={handeleOrderStatus}
                >
                  
                  {status === "PENDING" && (
                    <>
                      <FormControlLabel
                        value="AWAITING_PAYMENT"
                        control={<Radio />}
                        label="AWAITING_PAYMENT"
                      />
                      <FormControlLabel
                        value="CANCELLED"
                        control={<Radio />}
                        label="CANCELLED"
                      />
                      <FormControlLabel
                        value="CONVERTED"
                        control={<Radio />}
                        label="CONVERTED"
                      />
                    </>
                  )}

                  
                  {status === "AWAITING_PAYMENT" && (
                    <>
                      <FormControlLabel
                        value="PROCESSING"
                        control={<Radio />}
                        label="PROCESSING"
                      />
                    </>
                  )}
                  {status === "PROCESSING" && (
                    <>
                      <FormControlLabel
                        value="COMPLETED"
                        control={<Radio />}
                        label="COMPLETED"
                      />
                    </>
                  )}

                  {/* Testing Purposes only */}
                
                  {/* {status === "CANCELLED" && (
                    <>
                      <FormControlLabel
                        value="PROCESSING"
                        control={<Radio />}
                        label="PROCESSING"
                      />
                      <FormControlLabel
                        value="PENDING"
                        control={<Radio />}
                        label="PENDING"
                      />
                      <FormControlLabel
                        value="AWAITING_PAYMENT"
                        control={<Radio />}
                        label="AWAITING_PAYMENT"
                      />
                    </>
                  )} */}

                </RadioGroup>
              </FormControl>
              <div className="text-right">
                <h5 className="font-normal">
                  <strong>Order date: </strong>
                </h5>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="none"
                  id="mui-pickers-date"
                  label="Order Date"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={createDate}
                  fullWidth
                  format="MMMM dd, yyyy"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </>
      </div>
    </ValidatorForm>
  );
};

const initialValues = {
  id: "",
  referenceNo: "",
  customerId: {
    firstName: "",
    lastName: "",
    email: "",
  },
  deliveryAddress: "",
  // orderItems: [],
  status: "",
  totalDiscount: "",
  createDate: new Date(),
  currency: "₦",
  loading: false,
};

const updatedValues = {
    id: "",
    specialOrderNo: "",
    customerName:"",
    email: "",
    mobileNo: "",
    quantity: "",
    location:"",
    status:"",
    loading: false,
    descrition:"",
    expectedDeliveryDate: new Date(),
}
export default SpecialOrderEditor;
