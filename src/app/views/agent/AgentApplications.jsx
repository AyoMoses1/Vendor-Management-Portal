import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAgentsApplications,
  approveAgentApplication,
} from 'app/redux/actions/agents-action';
import { useDialog } from 'muibox';
import './style.scss';
import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';
import { FiMoreVertical } from 'react-icons/fi';
import Modal from '../../components/Modal';
import CustomSnackBar from '../../components/Snackbar'
import { APPROVE_AGENT_APPLICATION } from '../../redux/actions/agents-action';

const Agents = () => {
  const { content, pageNumber, pageSize, offset, loading } = useSelector(
    (state) => state.agentApplication,
  );
  const { loading: approvalLoading, showSnackBar } = useSelector(
    (state) => state.agentApproval,
  );
  const [id, setId] = React.useState(0);
  //const [count, setCount] = React.useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openApprovalModal, setopenApprovalModal] = useState(false);
  const [activeApplication, setActiveApplication] = useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const dialog = useDialog();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgentsApplications());
  }, [dispatch]);

  useEffect(() => {
      if(showSnackBar){
        setopenApprovalModal(false);
        dispatch({type: APPROVE_AGENT_APPLICATION});
      }
  })

  /* const onPageChange = (page) => {
    dispatch(getAllAgents( page ));
    setPage(page);
  }; */

  const handleMenu = (option, user) => {
    if (option === 'Approve') {
        console.log(user)
      setActiveApplication(user);
      setopenApprovalModal(true);
    }
  };

  const handleApplicationApproval = () => {
    dispatch(approveAgentApplication({ applicationId: activeApplication.id }));
  };
  const columns = [
    {
      name: 'firstName', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = content[dataIndex];
          setId(user.id);
          return (
            
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${user?.firstName} ${user?.lastName}`}</h5>
              </div>
         
          );
        },
      },
    },
    {
      name: 'mobileNo', // field name in the row object
      label: 'Contact', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = content[dataIndex];
          setId(user.id);
          return (
           
              <div /* className='w-220' */>
                <h6 style={{wordBreak:'break-all'}}>
                  <strong>Email:</strong> {user?.email}
                </h6>
                <br />
                <h5  className='my-0'>Phone: {user?.mobileNo}</h5>
              </div>
         
          );
        },
      },
    },
    {
      name: 'agentType', // field name in the row object
      label: 'Agent Type', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = content[dataIndex];
          setId(user.id);
          return (
            
              <div className='ml-3'>
                <h5 className='my-0'>
                  {user?.agentType === 'BD_AGENT' ? 'BDA AGENT' : 'LEAD AGENT'}
                </h5>
              </div>
         
          );
        },
      },
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = content[dataIndex];
          return (
           
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {user.state || '-----'}</h5>
              </div>
            
          );
        },
      },
    },
    {
        name: 'status',
        label: 'Application Status',
        options: {
          filter: true,
          customBodyRenderLite: (dataIndex) => {
            let user = content[dataIndex];
            return (
                <div className='ml-3'>
                  <h5 className='my-0 text-muted'> {user.status || '-----'}</h5>
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
          let user = content[dataIndex];
          return (
            <div>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
              >
                <FiMoreVertical />
              </IconButton>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {['Approve', 'View Details'].map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === 'Pyxis'}
                    onClick={() => handleMenu(option, user)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
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
            { name: 'Agents', path: '/agents' },
            { name: 'Agent' },
          ]}
        />
        {/* {severity === "error" && (
          <Notification alert={error} severity={severity || ""} />
        )} */}
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'All Agent Applications'}
              data={content}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm('Are you sure you want to delete?')
                    .then((value) => console.log('delete'))
                    .catch(() => {
                      return false;
                    }),
                pageSize,
                page,
                handleChangePage,
                /*  onTableChange: (action, tableState) => {
                  if (action === "changePage") {
                    onPageChange(tableState.page);
                  }
                }, */
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
                        onChange={({ target: { value } }) =>
                          handleSearch(value)
                        }
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
                customToolbar: () => {
                  return (
                    <Link
                      to={{
                        pathname: '/agent/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Add New
                      </Button>
                    </Link>
                  );
                },
              }}
            />
          )}
        </div>
        <Modal
          title='Agent Approval'
          open={openApprovalModal}
          okText={approvalLoading? '...loading':'Approve agent'}
          onOk={handleApplicationApproval}
          onClose={() => setopenApprovalModal(false)}
          loading={approvalLoading}
        >
          <p>
            Do you want to approve application from{' '}
            {`${activeApplication.firstName} ${activeApplication.lastName}`}?
          </p>
        </Modal>
        <CustomSnackBar message={`${activeApplication.firstName} ${activeApplication.lastName} application approved`} open={showSnackBar}/>
      </div>
    </div>
  );
};

export default Agents;
