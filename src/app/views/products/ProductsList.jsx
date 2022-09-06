import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDialog } from 'muibox';
import { deleteProduct, getAllResults } from './ProductService';
import Loading from 'matx/components/MatxLoadable/Loading';
import { useDispatch } from 'react-redux';
import { updateProductFeature } from '../../redux/actions/ussd-action';
import CircleIcon from '@mui/icons-material/Circle';
import './products-view.css'
import { debounce } from "lodash";

const Products = () => {
  
}

export default Products;
