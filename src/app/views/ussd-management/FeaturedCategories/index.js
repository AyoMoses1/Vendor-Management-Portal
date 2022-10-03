import React, { useEffect } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  Chip,
  MenuItem
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDialog } from 'muibox';
import {
  getProductCategories,
  updateCategoryFeature,
} from '../../../redux/actions/ussd-action';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

const USSDProductCategoriesComponent = () => {

  const [title, setTitle] = React.useState('ALL Categories')
  const [source, setSource] = React.useState("ALL");

  const { loading, productCategories, error } = useSelector(
    (state) => state.getFeaturedUssdCat,
  );
  const dialog = useDialog();
  const dispatcher = useDispatch();


  const options = [
    {
      type: "ALL CATEGORIES",
      value: "ALL",
    },
    {
      type: "FEATURED",
      value: true,
    },
    {
      type: "NOT FEATURED",
      value: false,
    }
  ];
  const featureCat = async (productCat) => {
    dispatcher(
      updateCategoryFeature({
        data: {
          id: productCat.id,
          isFeaturedOnUssd: !productCat.isFeaturedOnUssd,
        },
      }),
    );
    return Promise.resolve();
  };

  const handleFeaturedOnUSSD = async (productCat) => {
    try {
      const confirmMessage = productCat.isFeaturedOnUssd
        ? `Do you want to remove ${productCat.name} from USSD menu?`
        : `Do you want to feature ${productCat.name} on USSD menu?`;
      await dialog.confirm(confirmMessage);
      await featureCat(productCat);
      dispatcher(getProductCategories({}));
    } catch (error) {
    }
  };

  const handleTitle = (value) => {
    console.log(value, "source")
    
    setSource(value)
  }


  useEffect(() => {
    dispatcher(getProductCategories({}));
  }, []);

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Category', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const productCategory = productCategories[dataIndex];
          return (
            <Link
              to={{
                pathname: `/ussd-products/${productCategory.id}`,
                state: {
                  id: productCategory.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${productCategory?.name}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'subCategories',
      label: 'Sub-Categories',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let productCategory = productCategories[dataIndex];
          let subCategories = productCategory?.subCategories;
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: `/ussd-products/${productCategory.id}`,
                    state: {
                      id: productCategory.id,
                    },
                  }}
                  className='flex items-center'
                >
                  {subCategories?.length ? subCategories.map((subcategory) => {
                    return `${subcategory.name}, `;
                  }) : `---`}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'date',
      label: 'Date Created',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let productCategory = productCategories[dataIndex];
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: `/ussd-products/${productCategory.id}`,
                    state: {
                      id: productCategory.id,
                    },
                  }}
                  className='flex items-center'
                >
                  {productCategory?.date ?? '---'}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'status', // field name in the row object
      label: 'Featured Status', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const productCategory = productCategories[dataIndex];
          return productCategory.isFeaturedOnUssd ? (
            <div className='featured'>
              <div></div>
            </div>
          ) : (
            <div className='not-featured'>
              <div></div>
            </div>
          );
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let productCategory = productCategories[dataIndex];
          return (
            <Button
              onClick={() => handleFeaturedOnUSSD(productCategory)}
              variant='text'
            >
              {productCategory.isFeaturedOnUssd ? (
                <div className={`items-center category isFeatured`}>
                  <span className="ml-3">Remove from USSD</span>
                </div>
              ) : (
                <div className={`items-center category isNotFeatured`}>
                  <span className="ml-3">Add to USSD</span>
                </div>
              )}
            </Button>
          );
        },
      },
    },
  ];

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            {
              name: 'USSD Featured Categories',
              path: '/ussd-featured-categories',
            },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 ussd-cat-table'>
          {loading && <CircularProgress size={20} />}
          <MUIDataTable
            // title={<h5 className='mt-4 mb-0 product-table'>USSD Featured Categories</h5>}
            title={
              <div>
                <h5 className="mt-4 mb-0">{title}</h5>
                <div className="w-full flex">
                  <div className="w-220 flex-end order-sources">
                    <TextField
                      className="mb-4 filter-area"
                      name="mobileNo"
                      label="Filter by source"
                      variant="outlined"
                      margin="normal"
                      select
                      value={source}
                      onChange={(e) => {
                        setSource(e.target.value)
                        e.target.value ? setTitle("FEATURED CATEGORIES"): setTitle("NON-FEATURED CATEGORIES")
                        handleTitle(e.target.value)
                      }}
                    >
                      {options.map((option, idx) => (
                        <MenuItem key={idx} value={option.value}>
                          {option.type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            }
            data={productCategories}
            columns={columns}
            options={{
              filter: true,
              sort: true,
              sortOrder: { name: 'id', direction: 'desc' },
              filterType: 'dropdown',
              responsive: 'standard',
              elevation: 0,
              selectableRows: false,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
              customSearchRender: (
                searchText,
                handleSearch,
                hideSearch,
                options,
              ) => {
                return (
                  <Grow appear in={true} timeout={300}>
                    <TextField
                      variant='outlined'
                      size='small'
                      fullWidth
                      onChange={({ target: { value } }) => handleSearch(value)}
                      InputProps={{
                        style: {
                          paddingRight: 0,
                        },
                        startAdornment: (
                          <Icon className='mr-2' fontSize='small'>
                            search
                          </Icon>
                        ),
                        endAdornment: (
                          <IconButton onClick={hideSearch}>
                            <Icon fontSize='small'>clear</Icon>
                          </IconButton>
                        ),
                      }}
                    />
                  </Grow>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default USSDProductCategoriesComponent;
