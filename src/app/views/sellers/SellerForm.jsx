import React, { useState, useEffect } from "react";
import {
  FormControl,
  Card,
  TextField,
  Button,
} from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import {
    getSellerById,
    addSeller,
    updateSeller,
  } from "./SellerService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "63ch",
    },
  },
}));

function NewVendor({isNewSeller, id, Seller}) {
  const initialState = {
    email: "",
    country: "",
    password: "",
    name: "",
    mobileNo: "",
    // storeSlug: "",
    state: "",
    // storeName: "",
    zipCode: "",
    address: "",
    // storeEmail: "",
    password: "password",
    secretAnswer: "secret",
    creditLimit: "",
    creditSpent: "",
    loyaltyNo: "",
    loyaltyPoint: "",
    picture: "",
    referralCode: "",
    walletBalance: "",
  };

  const history = useHistory();

  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [seller, setSeller] = useState(Seller)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setSeller({...seller, [name]: value})
  };

  const handleSubmit = (event) => {
    let tempState = { ...state };
    if (isNewSeller)
      addSeller(tempState).then(() => {
        setState({ ...state });
        history.push(`/vendors`);
      });
    else
      updateSeller(seller).then(() => {
        setState({ ...state });
      });
  };

  useEffect(() => {
    if (!isNewSeller) {
      getSellerById(id).then(({ data }) => {
        console.log(data.object);
        setState(data.object);
        console.log(state);
      });
    }
  }, [id, isNewSeller]);

  return (
    <div className="w-100 overflow-auto">
      <Card>
        <FormControl className={classes.root}>
          <div>
            <TextField
              onChange={handleChange}
              value={state.name}
              name="name"
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />

            <TextField
              onChange={handleChange}
              value={state.email}
              name="email"
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.mobileNo}
              name="mobileNo"
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
            />

            <TextField
              onChange={handleChange}
              value={state.address}
              name="address"
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>

          <div>
            <TextField
              onChange={handleChange}
              value={state.city}
              name="city"
              margin="dense"
              label="City/Town"
              type="text"
              fullWidth
              variant="outlined"
            />

            <TextField
              onChange={handleChange}
              value={state.state}
              name="state"
              margin="dense"
              label="State"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.country}
              name="country"
              margin="dense"
              label="Country"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={handleChange}
              value={state.zipCode}
              name="zipCode"
              margin="dense"
              label="Postcode/Zip"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </div>
  );
}

export default NewVendor;
