import React, { useEffect } from 'react'
import "./shared.css"
import {
    TextField,
    Grow,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import { SimpleCard } from 'matx'
import { Link } from 'react-router-dom'
import CircleIcon from '@mui/icons-material/Circle';
import "./shared.css";
import { capitalize } from 'utils'
import { useDialog } from 'muibox'
import http from '../../../services/api';

const CategoryProducts = ({ categoryProducts, categoryId, tableRefresh }) => {
    const dialog = useDialog()

    const columns = [
        {
            name: "name", // field name in the row object
            label: "Name", // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                    className="ml-3 mr-4"
                                >
                                    {product?.name.slice(0, 10) + "..."}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'categories',
            label: 'Categories',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    let n = product?.productCategories?.map((name) => name.name);
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {product && n.join(',').slice(0, 8) + "..."}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className={`flex`}>
                            <div className={`ml-3 PRODUCT ${product?.status}`}>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {capitalize(product?.status ?? "---")}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}

                                >

                                    {" "}
                                    {`₦${product?.price}` || "---"}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'sku',
            label: 'Sku',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {product?.sku || '---'}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: "tags",
            label: "Tags",
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    let n = product?.tags?.map((name) => name?.name);
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {n.length > 0 ? n.join(',').slice(0, 8) + "..." : ' ---'}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'dateAdded',
            label: 'Date Created',
            options: {
                filter: true,
                setCellHeaderProps: () => { return { width: "130px" } },
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {product?.dateAdded || '---'}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'seo',
            label: 'SEO',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex items-center product__seo'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: "/product/details",
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                    className="SEO"
                                >
                                    <CircleIcon />
                                    <div className='my-0 text-15'> {product?.seo || '70%'}</div>
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'seller',
            label: 'Seller',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex'>
                            <div className='ml-3'>
                                <Link
                                    to={{
                                        pathname: '/product/details',
                                        state: {
                                            id: product?.id,
                                        },
                                    }}
                                >
                                    {product?.storeId?.sellerId?.name?.slice(0, 10) + "..." || '---'}
                                </Link>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'Deassociate',
            label: '',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    let product = categoryProducts[dataIndex];
                    return (
                        <div className='flex items-center'>
                            <Link
                                onClick={() => {
                                    let tempState = [{ id: categoryId }];
                                    dialog
                                        .confirm('Are you sure you want to deassociate product from this Category?')
                                        .then(() =>
                                            http.patch(`/afrimash/products/${product?.id}/dissociate-categories`, tempState).then((response) => {
                                                tableRefresh();
                                            }).catch(err => { })
                                        )
                                        .catch((error) => console.error(error))
                                }}
                            >
                                <img style={{ height: '20px' }} src='/assets/icon/delete-basket.svg' />
                            </Link>
                        </div >
                    );
                },
            },
        },
    ];

    return (
        <div className="product-tables">
            <SimpleCard>
                <MUIDataTable
                    title={<div>
                        <h4 className='mt-4 mb-0'>{'Category Products'}</h4>
                    </div>}
                    data={categoryProducts ?? []}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'standard',
                        elevation: 5,
                        selectableRows: false,
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                        customSearchRender: (
                            searchText,
                            handleSearch,
                            hideSearch,
                            options
                        ) => {
                            return (
                                <Grow appear in={true} timeout={300}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        onChange={({ target: { value } }) =>
                                            handleSearch(value)
                                        }
                                    />
                                </Grow>
                            )
                        },
                    }}
                />
            </SimpleCard>
        </div>
    )
}

export default CategoryProducts
