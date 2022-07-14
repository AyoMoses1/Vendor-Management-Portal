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
  updateCategoryFeature,
} from '../../../redux/actions/ussd-action';

import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const USSDProductCategoriesComponent = () => {
  const { loading, productCategories, error } = useSelector(
    (state) => state.getFeaturedUssdCat,
  );
  const dialog = useDialog();
  const dispatcher = useDispatch();

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

  useEffect(() => {
    dispatcher(getProductCategories({}));
  }, []);

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const productCategoty = productCategories[dataIndex];
          return (
            <Link
              to={{
                pathname: `/ussd-products/${productCategoty.id}`,
                state: {
                  id: productCategoty.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${productCategoty?.name}`}</p>
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
          const productCategory = productCategories[dataIndex];

          return productCategory.isFeaturedOnUssd ? (
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
          let productCategory = productCategories[dataIndex];
          return (
            <Button
              onClick={() => handleFeaturedOnUSSD(productCategory)}
              variant='text'
            >
              {productCategory.isFeaturedOnUssd
                ? 'Remove from USSD'
                : 'Add to USSD'}
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
        <div className='min-w-750'>
          {loading && <CircularProgress size={20} />}
          <MUIDataTable
            title={'USSD Featured Categories'}
            data={productCategories}
            columns={columns}
            options={{
              serverSide: true,
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

export default USSDProductCategoriesComponent;
