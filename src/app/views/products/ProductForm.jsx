import React, { useState, useEffect, Fragment, useCallback } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Checkbox,
  Icon,
  Card,
} from "@material-ui/core";
import { getProductById, addProduct, updateProduct } from "./ProductService";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import http from "../../services/api";
import { useHistory } from "react-router-dom";
import Notification from "../../components/Notification";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const usestyles = makeStyles(({ palette, ...theme }) => ({
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

const productTypes = ["EXTERNAL", "GROUPED", "SIMPLE", "VARIANT"];

function NewProduct({ isNewProduct, id, Product }) {
  const initialState = {
    tags: [],
    productCategories: [],
    brandId: "",
    storeId: "",
  };
  const initialValues = {
    productType: "",
    discountRate: "",
    price: "",
    sku: "",
    name: "",
    description: "",
  };

  const history = useHistory();

  const classes = usestyles();
  const [state, setState] = useState(initialState);
  const [values, setValues] = useState(initialValues);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [product, setProduct] = useState(Product);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ accept: "image/*", onDrop });

  const formik = useFormik({
    handleChange: (values) => {},
  });

  useEffect(() => {
    getBrands();
    getTags();
    getStores();
    getCategories();
    setImageList(acceptedFiles);
    if (!isNewProduct) {
      getProductById(id).then(({ data }) => {
        console.log(data.object);
        setState(data.object);
        console.log(state);
        setValues(data.object);
        console.log(values)
      });
    }
  }, [acceptedFiles]);

  const handleSelect = (newValue, fieldName) => {
    const { id } = newValue;
    setState({ ...state, [fieldName]: id });
    console.log(state);
  };

  const getBrands = () => {
    http
      .get(`/afrimash/brands/`)
      .then((response) => {
        let { data } = response;
        console.log(data);
        setBrands(data);
        console.log(brands);
      })
      .catch((err) => {
        setAlert("An Error Ocurred, Please Try Again");
        setSeverity("error");
      });
  };

  const getTags = () => {
    http
      .get(`/afrimash/tags/`)
      .then((response) => {
        setTags(response.data.object);
      })
      .catch((err) => {
        setAlert("An Error Ocurred, Please Try Again");
        setSeverity("error");
      });
  };

  const getStores = () => {
    http
      .get(`afrimash/stores?page=1&size=100&search=search`)
      .then((response) => {
        setStores(response.data.object);
      })
      .catch((err) => {
        setAlert("An Error Ocurred, Please Try Again");
        setSeverity("error");
      });
  };

  const getCategories = () => {
    http
      .get(`/afrimash/product-categories/search?`)
      .then((response) => {
        setCategories(response.data.object);
      })
      .catch((err) => {
        setAlert("An Error Ocurred, Please Try Again");
        setSeverity("error");
      });
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    const payload = { ...state, ...values };
    console.log(payload);
    const data = new FormData();
    const token = localStorage.getItem("jwt_token");
    //  console.log(state)

    data.append("product", JSON.stringify(payload));

    imageList.forEach((file, imageFile) => {
      console.log(file);
      data.append("imageFile", file);
    });

    axios({
      method: "post",
      url: "https://api.afrimash.com/afrimash/products",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        history.push("/products");
      })
      .catch(function (response) {
        setAlert("An Error Ocurred, Couldn't Create Product");
        setSeverity("error");
      });
  };

  return (
    <div className="m-sm-30">
      <Notification alert={alert} severity={severity} />
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={productSchema}
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
                  name="productType"
                  label="Select Product Type"
                  variant="outlined"
                  fullWidth
                  select
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productType || ""}
                  error={Boolean(touched.productType && errors.productType)}
                  helperText={touched.productType && errors.productType}
                >
                  {productTypes.sort().map((productType) => (
                    <MenuItem value={productType} key={productType}>
                      {productType}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  className="mb-4"
                  name="price"
                  label="Product Price(₦)"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price || ""}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />

                <TextField
                  className="mb-4"
                  name="discountRate"
                  label="Discount Rate (%)"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discountRate || ""}
                  error={Boolean(touched.discountRate && errors.discountRate)}
                  helperText={touched.discountRate && errors.discountRate}
                />

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
              <Grid item sm={6} xs={12}>
                <TextField
                  className="mb-4"
                  name="name"
                  label="Product Name"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  className="mb-4"
                  name="sku"
                  label="SKU"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sku || ""}
                  error={Boolean(touched.sku && errors.sku)}
                  helperText={touched.sku && errors.sku}
                />
                <TextField
                  className="mb-4"
                  name="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                  multiline
                  // rows={8}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || ""}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <Autocomplete
                  id="storeId"
                  name="storeId"
                  options={stores}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    handleSelect(newValue, "storeId")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Store"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  id="tags"
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setState({ ...state, tags: newValue });
                    console.log(state);
                  }}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Tags"
                      placeholder="Tag"
                      fullWidth
                      margin="dense"
                    />
                  )}
                />

                <Autocomplete
                  id="brands"
                  options={brands}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(event, newValue) =>
                    handleSelect(newValue, "brandId")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Brand"
                      margin="dense"
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="categoried"
                  options={categories}
                  onChange={(event, newValue) => {
                    setState({ ...state, productCategories: newValue });
                    console.log(state);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Categories"
                      placeholder="Category"
                      fullWidth
                      margin="dense"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              className="mb-4 px-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              Add Product
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
});

export default NewProduct;
