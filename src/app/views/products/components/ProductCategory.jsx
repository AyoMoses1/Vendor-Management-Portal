import React, { useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Checkbox, Button, Grid, CircularProgress } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from 'app/components/Alert';
import { updateProduct } from '../ProductService';
import AddCategories from './AddCategories';

const ProductCategory = ({ product, categories, invoke }) => {
    const [updating, setUpdating] = React.useState(false);
    const [parentCategories, setParentCategories] = React.useState([])
    const [subCategories, setSubCategories] = React.useState([])
    const [categoryGrouping, setCategoryGrouping] = React.useState([])
    const [subCategoriesWithoutParent, setSubCategoriesWithoutParent] = React.useState([])
    const [values, setValues] = React.useState({});
    const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
    const [isOpen, setIsOpen] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    const handleModal = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (product) {
            prepareCategories(product)
        }
    }, [product])

    const prepareCategories = (product) => {
        let grouping = [];
        setValues(product);
        const productCategories = product?.productCategories;
        const parents = {};
        const noParent = [];
        const groupedItem = Object.entries(
            productCategories.reduce((data, item) => {
                if (item?.parentCategoryId && !data[item?.parentCategoryId?.id]) {
                    data[item?.parentCategoryId?.id] = [];
                    parents[item?.parentCategoryId?.id] = item?.parentCategoryId
                }
                if (item?.parentCategoryId) {
                    data[item?.parentCategoryId?.id].push(item);
                }
                return data;
            }, {})
        ).map(([id, childCategories]) => ({ id, childCategories }));

        for (let i = 0; i < groupedItem?.length; i++) {
            if (parents[groupedItem[i]?.id]) {
                grouping.push({ ...parents[groupedItem[i]?.id], childCategories: groupedItem[i]?.childCategories })
            }
        }

        for (let i = 0; i < productCategories?.length; i++) {
            if (!productCategories[i]?.parentCategoryId) {
                noParent.push(productCategories[i])
            }
        }
        setCategoryGrouping(grouping);
        setSubCategoriesWithoutParent(noParent);
    }

    const handleSubCategory = (event, id) => {
        const checked = event.target.checked;
        if (!checked) {
            setSubCategories([...subCategories, id])
        } else {
            const _subCategories = subCategories;
            const index = _subCategories.indexOf(id);
            if (index > -1) {
                _subCategories.splice(index, 1);
            }
            setSubCategories(_subCategories);
        }
    }

    const handleParentCategory = (event, id) => {
        const checked = event.target.checked;
        if (!checked) {
            setParentCategories([...parentCategories, id])
        } else {
            const _parentCategories = parentCategories;
            const index = _parentCategories.indexOf(id);
            if (index > -1) {
                _parentCategories.splice(index, 1);
            }
            setParentCategories(_parentCategories);
        }
    }

    const handleSubmit = () => {
        const cats = []
        const pCats = []
        if (subCategories?.length) {
            for (let i = 0; i < values?.productCategories?.length; i++) {
                if (!subCategories.includes(values?.productCategories[i]?.id)) {
                    cats.push(values?.productCategories[i])
                }
            }
        }
        const _values = { ...values, productCategories: cats?.length ? cats : values?.productCategories }

        if (parentCategories?.length) {
            for (let i = 0; i < _values?.productCategories?.length; i++) {
                if (!parentCategories.includes(_values?.productCategories[i]?.parentCategoryId?.id)) {
                    pCats.push(_values?.productCategories[i])
                }
            }
        }
        const __values = { ..._values, productCategories: pCats?.length ? pCats : _values?.productCategories }

        setUpdating(true)
        performUpdate(__values);
    };

    const refresh = () => {
        setAlertData({ success: true, text: "Product updated sucessfully", title: 'Product Updated' })
        handleDisplayModal();
        invoke();
    }

    const performUpdate = (values) => {
        updateProduct({ ...values })
            .then((res) => {
                if (res.status === 200) {
                    prepareCategories(res?.data?.object);
                    setSubCategories([]);
                    setUpdating(false)
                    setAlertData({ success: true, text: "Product category updated sucessfully", title: 'Product Category Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product category' })
                    handleDisplayModal();
                };
            })
            .catch((err) => {
                setUpdating(false)
                setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product category' })
                handleDisplayModal();
            });
    }

    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <div className='flex justify-between items-center'>
            <div className="product-details-title">Product Category</div>
            <Button
                variant='contained'
                color='primary'
                className='product-outline-save-btn'
                onClick={handleSubmit}
                disabled={updating || (!subCategories?.length && !parentCategories?.length)}
            >
                {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                {updating ? "Please wait..." : "Save"}
            </Button>
        </div>
        <div className="scrolling-wrapper--grid">
            <Grid container spacing={2} className='mt-4 product-category'>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormGroup className='form-group'>
                        <div className='form-title'>All Categories</div>
                        {
                            categoryGrouping?.map((cg, index) =>
                                <React.Fragment key={index + 'cg'}>
                                    <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => handleParentCategory(e, cg?.id)} />} label={cg?.name} className='product-checkbox' />
                                    {
                                        cg?.childCategories?.map((cc, idx) => <FormControlLabel key={idx + 'cc'} control={<Checkbox defaultChecked onChange={(e) => handleSubCategory(e, cc?.id)} />} label={cc?.name} className='product-checkbox sub' />)
                                    }
                                </React.Fragment>
                            )
                        }
                        {
                            subCategoriesWithoutParent?.map((scwp, idx) =>
                                <React.Fragment key={idx + 'scwp'}>
                                    <FormControlLabel control={<Checkbox defaultChecked disabled />} label="No Parent Category" className='product-checkbox' />
                                    <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => handleSubCategory(e, scwp?.id)} />} label={scwp?.name} className='product-checkbox sub' />
                                </React.Fragment>
                            )
                        }
                        {/* <FormControlLabel control={<Checkbox />} label="Sub Category" className='product-checkbox sub' />
                    <FormControlLabel control={<Checkbox />} label="Sub Sub Category" className='product-checkbox sub-sub' />
                    <FormControlLabel control={<Checkbox />} label="Sub Category" className='product-checkbox sub' />
                    <FormControlLabel control={<Checkbox />} label="Sub Sub Category" className='product-checkbox sub-sub' />
                    <FormControlLabel control={<Checkbox />} label="Primary Category" className='product-checkbox' />
                    <FormControlLabel control={<Checkbox />} label="Sub Category" className='product-checkbox sub' />
                    <FormControlLabel control={<Checkbox />} label="Sub Sub Category" className='product-checkbox sub-sub' /> */}
                    </FormGroup>
                </Grid>
            </Grid>
        </div>
        <div className='product-category'>
            <Button
                onClick={() => { handleModal() }}
            >
                Add New Category
            </Button>
        </div>
        <AddCategories
            name={"Add Categories to Product"}
            isOpen={open}
            handleClose={handleModal}
            categories={categories}
            refresh={refresh}
            id={product?.id} />
        <Alert
            isOpen={isOpen}
            handleModal={handleDisplayModal}
            alertData={alertData}
            handleOK={handleDisplayModal}
        />
    </Box>
}

export default ProductCategory;