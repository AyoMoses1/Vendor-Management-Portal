import React from 'react'
import "./shared.css"
import {
    TextField,
    Grow,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import { SimpleCard } from 'matx'
import "./shared.css";

const ProductSubcategories = ({ subCategories }) => {
    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let sub = subCategories[dataIndex];
                    return (
                        <div className='flex items-center'>
                            <div className='ml-3'>
                                {sub?.name ?? '---'}
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'isFeatured',
            label: 'Is Subcategory Featured',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let sub = subCategories[dataIndex];
                    return (
                        <div className='flex items-center'>
                            <div className='ml-3'>
                                {sub?.isFeatured ? 'Yes' : 'No'}
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            name: 'visible',
            label: 'Visible',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let sub = subCategories[dataIndex];
                    return (
                        <div className='flex items-center'>
                            <div className='ml-3'>
                                {sub?.visible ? 'Yes' : 'No'}
                            </div>
                        </div>
                    );
                },
            },
        },
    ]

    return (
        <div className="product-tables">
            <SimpleCard>
                <MUIDataTable
                    title={<div>
                        <h4 className='mt-4 mb-0'>{'Subcategories'}</h4>
                    </div>}
                    data={subCategories ?? []}
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

export default ProductSubcategories
