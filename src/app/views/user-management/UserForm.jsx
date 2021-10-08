import React, { useState, useEffect } from "react";
import {
  FormControl,
  Card,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { getUserById, addUser, updateUser, getAllRoles } from "./UserService";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../../components/Notification";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "63ch",
    },
  },
}));

function UserForm({ isNewUser, id, User }) {
  const values = {
    email: "",
    lastName: "",
    firstName: "",
    phoneNo: "",
    role: {},
  };
  const classes = useStyles();
  const [state, setState] = useState(values);
  const [user, setUser] = useState(User);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setUser({ ...user, [name]: value });
    console.log(state);
  };

  const handleSubmit = (event) => {
    let tempState = { ...state };
    if (isNewUser)
      addUser(tempState).then(() => {
        setState({ ...state });
        history.push(`/users`);
      });
    else
      updateUser(user).then(() => {
        setState({ ...state });
      });
  };

  useEffect(() => {
    getRoles();
    if (!isNewUser) {
      getUserById(id).then(({ data }) => {
        console.log(data.object.role);
        setState(data.object);
        console.log(state.role);
        setRole(data.object.role.name);
        console.log(role);
      });
    }
  }, [id, isNewUser]);

  const getRoles = () => {
    getAllRoles().then(({ data }) => {
      setRoles(data.object);
      console.log(data);
    });
  };

  return (
    
    <div className="w-100 overflow-auto">
      <Card>
        <FormControl className={classes.root}>
          <div>
            <TextField
              onChange={handleChange}
              value={state.firstName}
              name="firstName"
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
            />

            <TextField
              onChange={handleChange}
              value={state.lastName}
              name="lastName"
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
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

            <TextField
              onChange={handleChange}
              value={state.phoneNo}
              name="phoneNo"
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              className="mb-4"
              name="role"
              label="Select User Role"
              variant="outlined"
              fullWidth
              select
              margin="dense"
              onChange={handleChange}
              value={state.role.name}
            >
              {roles.sort().map((role) => (
                <MenuItem value={role} key={role.id}>
                  {role.name.substr(5)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={handleChange}
              value={state.zipCode}
              name="zipCode"
              margin="dense"
              label="Postcode/ZipCode"
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

export default UserForm;
