import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  FormControl,
  Card,
  TextField,
  Button,
  Grid,
  Checkbox,
  Icon,
} from "@material-ui/core";
import {
  getProductCategoryById,
  addProductCategory,
  updateProductCategory,
} from "./ProductService";
import { makeStyles } from "@material-ui/core/styles";
import http from "../../services/api";
import { useHistory } from "react-router-dom";
import { Formik, useFormik } from "formik";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "63ch",
      formcontrol: {
        minWidth: "100%",
      },
    },
  },
  dropZone: {
    transition: "all 350ms ease-in-out",
    border: "2px dashed rgba(var(--body),0.3)",
    "&:hover": {
      background: "rgba(var(--body), 0.2) !important",
    },
    borderRadius: " 4px !important",
    borderStyle: "dashed",
    borderColor: "#DCDCDC",
    height: "190px",
    overflow: " hidden",
    marginBottom: "1rem !important",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    color: "rgba(52, 49, 76, 1)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "#fff",
    display: "flex",
    boxSizing: "inherit",
    marginTop: "2px",
  },
}));

function NewCategory({ isNewCategory, id, Category }) {
  const initialValues = {
    name: "",
    translatedName: "",
  };

  const initialState = {
    parentCategoryId: "",
  };

  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [category, setCategory] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ accept: "image/*", onDrop });

  useEffect(() => {
    if (!isNewCategory) {
      getProductCategoryById(id).then(({ data }) => {
        setCategory(data.object);
      });
    }
    getCategories();
    setImageList(acceptedFiles);
  }, [acceptedFiles]);

  const handleSelect = (newValue, fieldName) => {
    console.log(newValue)
    const { id } = newValue;
    setState({ ...state, [fieldName]: id });
    console.log(state);
  };

  const onSubmit = (values) => {
    console.log(state);
    console.log(values);
    if (isNewCategory) {
      const payload = { ...state, ...values };
      console.log(payload);
      const data = new FormData();
      const token = localStorage.getItem("jwt_token");
      data.append("productCategory", JSON.stringify(payload));
      imageList.forEach((file, imageFile) => {
        console.log(file);
        data.append("imageFile", file);
      });

      axios({
        method: "post",
        url: "https://api.afrimash.com/afrimash/product-categories",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
          history.push("/product-categories");
        })
        .catch(function (response) {
          console.log(response);
        });
    } 
  };

  const getCategories = () => {
    http
      .get(`/afrimash/product-categories/search?`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.object);
      })
      .catch((err) => {
        setCategories([]);
        alert(err.response.data);
      });
  };

  return (
    <div className="m-sm-30">
      <div className="w-100 overflow-auto">
        <Card>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={categorySchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting,
              setFieldValue,
            }) => (
              <form className="px-4" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      className="mb-4"
                      name="name"
                      label="Name"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || category.name || ""}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <TextField
                      className="mb-4"
                      name="translatedName"
                      label="Translated Name"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={
                        values.translatedName || category.translatedName || ""
                      }
                      error={Boolean(
                        touched.translatedName && errors.translatedName
                      )}
                      helperText={
                        touched.translatedName && errors.translatedName
                      }
                    />

                    <Autocomplete
                      id="parentCategoryId"
                      name="parentCategoryId"
                      options={categories}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) =>{
                        console.log(newValue)
                        handleSelect(newValue, "parentCategoryId")
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Parent Category"
                          variant="outlined"
                          margin="dense"
                        />
                      )}
                    />

                    <Button
                      className="mt-4 mb-4 px-12"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Add Product
                    </Button>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <div
                      className={clsx({
                        [classes.dropZone]: true,
                        "bg-light-gray": !isDragActive,
                        "bg-gray": isDragActive,
                      })}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <div
                        className="flex-column items-center"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          className="text-muted text-48"
                          style={{ fontSize: "48px" }}
                        >
                          publish
                        </Icon>
                        {imageList.length ? (
                          <span>{imageList.length} images were selected</span>
                        ) : (
                          <span>Drop product images</span>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}

const categorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  translatedName: yup.string().required("Translated Name is required"),
});

export default NewCategory;
