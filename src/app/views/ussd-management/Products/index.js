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
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDialog } from 'muibox';
import {
  getProductCategories,
  getProducts,
} from '../../../redux/actions/ussd-action';

import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductFeature } from '../../../redux/actions/ussd-action';
import CircularProgress from '@material-ui/core/CircularProgress';

const USSDProductsComponent = ({ location, match }) => {
  const { loading, products, error } = useSelector(
    (state) => state.getFeaturedUssdProducts,
  );
  const { id } = location.state;

  const dialog = useDialog();
  const dispatcher = useDispatch();

  const featureProduct = async (product) => {
    dispatcher(
      updateProductFeature({
        data: {
          id: product.id,
          isFeaturedOnUssd: false,
        },
        catId: id,
      }),
    );

    return Promise.resolve();
  };

  const handleFeaturedOnUSSD = async (product) => {
    try {
      const confirmMessage = `Do you want to remove ${product.name} from USSD menu?`;
     
      await dialog.confirm(confirmMessage);
      await featureProduct(product);
      dispatcher(getProducts({ catId: id, params: {} }));
    } catch (error) {
    }
  };
  useEffect(() => {
    dispatcher(getProducts({ catId: id, params: {} }));
  }, [id]);

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const product = products[dataIndex];
          return (
            <Link
              to={{
                pathname: `/ussd-products/${product.id}`,
                state: {
                  id: product.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${product?.name}`}</p>
              </div>
            </Link>
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
          const product = products[dataIndex];

          return product.isFeatured ? (
            <Chip label='Featured' color='success' />
          ) : (
            <Chip label='Not Featured' color='failed' />
          );
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <Button
              onClick={() => handleFeaturedOnUSSD(product)}
              variant='text'
            >
              Remove from USSD
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
              name: 'USSD Product Categories',
              path: '/ussd-product-categories',
            },
            { name: 'USSD Products', path: '/ussd-products' },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading && <CircularProgress size={20} />}
          <MUIDataTable
            title={'USSD Product Categories'}
            data={products}
            columns={columns}
            options={{
              filter: true,
              sort: true,
              sortOrder: { name: 'id', direction: 'desc' },
              filterType: 'dropdown',
              responsive: 'standard',
              elevation: 0,
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

export default USSDProductsComponent;
