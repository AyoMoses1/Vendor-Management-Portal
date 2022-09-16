import React, { useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Checkbox, Grid, MenuItem, TextField, Button } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const productAttributes = [
    {
        name: 'Simple',
        value: 'SIMPLE',
    },
    {
        name: 'Complex',
        value: 'COMPLEX',
    },
]

const productItems = [
    {
        name: 'Item 1',
        value: 'ITEM_1',
    },
    {
        name: 'Item 2',
        value: 'ITEM_2',
    },
]

const ProductSpecification = () => {
    const [productAttribute, setProductAttribute] = useState('SIMPLE')

    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <div className="product-details-title">Product Specification</div>
        <Grid container spacing={1} className='mt-30'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={1} className="product-type-input-container">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className='product-details-subs-light'>Product Attribute</div>
                        <div className='product-shipping-weight mb-4 product-attribute'>
                            <div className='w-full attributes-container'>
                                <TextField
                                    className='mt-4 ml-0 mr-0 mb-4'
                                    name='productAttribute'
                                    label='Select Attribute'
                                    variant='outlined'
                                    margin='normal'
                                    select
                                    fullWidth
                                    value={productAttribute}
                                    onChange={(e) => { }}
                                >
                                    {productAttributes.map((att, idx) => (
                                        <MenuItem key={idx} value={att.value}>
                                            {att.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className='create-attribute'>Create Attribute</div>
                            </div>
                            <Button variant='contained' color='primary' className='product-outline-save-btn'>Add</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className='product-color-section'>
                <div className="product-details-title">Colour</div>
                <div className='title-divider'></div>
                <Grid container spacing={1} className="product-specification-input-container">
                    <Grid item lg={4} md={4} sm={6} xs={12} className="product-specification-input-col">
                        <div className='product-specification'>
                            <div className='product-details-subs-light'>Name:</div>
                            <label className='section-title'>Colour</label>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} className="product-specification-input-col">
                        <div className='product-details-subs-light'>Value(s):</div>
                        <div className='product-shipping-weight attribute-case'>
                            <div>
                                <Autocomplete
                                    className='mt-4 ml-0 mr-0 mb-2'
                                    multiple
                                    id='tags'
                                    options={productItems}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => { }}
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
                                            variant='outlined'
                                            label='Select Items'
                                            placeholder='Item'
                                            fullWidth
                                            margin='normal'
                                        />
                                    )}
                                />
                            </div>
                            {/* <TextField
                                className='mt-4 ml-0 mr-0 mb-2'
                                name='productItem'
                                label='Select Item'
                                variant='outlined'
                                margin='normal'
                                select
                                fullWidth
                                value={productItem}
                                onChange={(e) => { }}
                            >
                                {productItems.map((it, idx) => (
                                    <MenuItem key={idx} value={it.value}>
                                        {it.name}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                            <div className='items-extras'>
                                <Button variant='contained' color='primary' className='product-small-btn'>Select All</Button>
                                <div className='add-new-item'>Add New Item</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="product-specification-input-col">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Visible on the product page" className='product-checkbox' />
                            <FormControlLabel control={<Checkbox />} label="Used for variation" className='product-checkbox' />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <div className='button-flex'>
            <Button variant='contained' color='primary' className='product-gallery-save-btn'>Save</Button>
        </div>
    </Box>
}

export default ProductSpecification;