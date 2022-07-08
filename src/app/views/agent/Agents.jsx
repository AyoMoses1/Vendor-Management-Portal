import React, { useEffect, useState, useCallback } from 'react';
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
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAgents,
  approveAgentApplication,
  deleteAgent,
  transferCustomer,
} from 'app/redux/actions/agents-action';
import { useDialog } from 'muibox';
import './style.scss';
import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';
import { FiMoreVertical } from 'react-icons/fi';
import Modal from '../../components/Modal';
import CustomSnackBar from '../../components/Snackbar';

const Agents = () => {
  const { agentList, total, error, severity, loading, pages, size } =
    useSelector((state) => state.agents);
  const { loading: approvalLoading, showSnackBar } = useSelector(
    (state) => state.agentApproval,
  );
  const { loading: deleteAgentLoading } = useSelector(
    (state) => state.deleteAgentReducer,
  );
  const { loading: transferCustomerLoading } = useSelector(
    (state) => state.transferCustomerReducer,
  );
  const [id, setId] = useState(0);
  const [openApprovalModal, setopenApprovalModal] = useState(false);
  const [activeAgent, setActiveAgent] = useState({});
  const [openDeleteAgent, setOpenDeleteAgentModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [transferModalProps, setTransferModalProps] = useState({
    open: false,
    loading: false,
  });
  const [receipientAgent, setReceipientAgent] = useState('');
  const [activeAgentIndex, setActiveAgentIndex] = useState(null);
  const [rowActionType, setRowActionType] = useState('');
  const [page, setPage] = useState(0)

  const handleChangePage = (newPage) => {
    console.log({ agentList, newPage });
    setPage(newPage);
   dispatch(getAllAgents({ page: newPage, size : size}));
  };

  const handleChangeRowsPerPage = (value) => {
   dispatch(getAllAgents({ page: 0, size: parseInt(value, 10) }));
  };



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgents({}));
  }, []);

  const handleMenu = (option, user) => {
    setActiveAgent(user);
    if (option === 'Activate') {
      setopenApprovalModal(true);
    }
    if (option === 'Delete Agent' && user.customersCount === 0) {
      setOpenDeleteAgentModal(true);
    }

    if (option === 'Delete Agent' && user.customersCount > 0) {
      setTransferModalProps((prevState) => ({ ...prevState, open: true }));
    }
  };

  const handleApplicationApproval = () => {
    dispatch(approveAgentApplication({ applicationId: activeAgent.id }));
  };

  const handleDeleteAgent = async () => {
    await dispatch(deleteAgent(activeAgent.id));
    dispatch(getAllAgents({ page }));
    setOpenDeleteAgentModal(false);
  };

  const handleTransferCustomer = async () => {
    console.log({ receipientAgent });
    try {
      await dispatch(
        transferCustomer({
          sourceAgentId: activeAgent.id,
          reciepientAgentId: receipientAgent,
        }),
      );
      handleDeleteAgent();
      setTransferModalProps({ loading: false, open: false });
    } catch (error) {
      console.log({ error });
    }
  };

  const columns = [
    {
      name: 'firstName', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex];
          setId(user.id);
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-1'>{`${user?.firstName} ${user?.lastName}`}</h5>
              </div>
            </Link>
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
          let user = agentList[dataIndex];
          setId(user.id);
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h6>
                  <strong>Email:</strong> {user?.email}
                </h6>
                <br />
                <h5 className='my-0'>Phone: {user?.mobileNo}</h5>
              </div>
            </Link>
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
          let user = agentList[dataIndex];
          setId(user.id);
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-10'>
                <h5 className='my-0'>
                  {user?.agentType === 'BD_AGENT' ? 'BDA AGENT' : 'LEAD AGENT'}
                </h5>
              </div>
            </Link>
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
          let user = agentList[dataIndex];
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {user.state || '-----'}</h5>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'status', // field name in the row object
      label: 'Application status', // column title that will be shown in table
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex];
          setId(user.id);
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
            >
              <div>{user.status}</div>
            </Link>
          );
        },
      },
    },
    /*  {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => value,
        customBodyRenderLite: (dataIndex, another) => {
          console.log({ dataIndex, another });
          let user = agentList[dataIndex];

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
                {['View Details', 'Edit Agent', 'Delete Agent'].map(
                  (option) => {
                    if (option === 'Edit Agent') {
                      return (
                        <Link
                          to={{
                            pathname: '/agent/edit',
                            state: {
                              id: user.id,
                              user,
                            },
                          }}
                        >
                          <MenuItem key={option}>{option}</MenuItem>
                        </Link>
                      );
                    }
                    if (option === 'View Details') {
                      return (
                        <Link
                          to={{
                            pathname: `/agent/details/${user.id}`,
                            state: {
                              id: user.id,
                              agentCode: user.agentCode,
                            },
                          }}
                        >
                          <MenuItem key={option}>{option}</MenuItem>
                        </Link>
                      );
                    }
                    return (
                      <MenuItem
                        key={option}
                        onMouseDown={(e) => {
                          setRowActionType(option);
                        }}
                      >
                        {option}
                      </MenuItem>
                    );
                  },
                )}
              </Menu>
            </div>
          );
        },
      },
    }, */
    {
      name: 'Actions',
      label: 'actions',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex, another) => {
          let user = agentList[dataIndex];
          return (
            <>
              <Link
                to={{
                  pathname: '/agent/edit',
                  state: {
                    id: user.id,
                    user,
                  },
                }}
              >
                <MenuItem>Edit Agent</MenuItem>
              </Link>
              <Link
                to={{
                  pathname: `/agent/details/${user.id}`,
                  state: {
                    id: user.id,
                    agentCode: user.agentCode,
                  },
                }}
              >
                <MenuItem>View Details</MenuItem>
              </Link>
              <MenuItem onClick={() => handleMenu('Delete Agent', user)}>
                Delete Agent
              </MenuItem>
            </>
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
        {severity === 'error' && (
          <Notification alert={error} severity={severity || ''} />
        )}
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {false ? (
            <Loading />
          ) : (
            <MUIDataTable

              title={'All Agents'}
              data={[...agentList]}
              columns={columns}
              options={{
                serverSide: true,
                selectableRows: "none",
                count: total,
                page:  page,
                onChangePage: (value) => handleChangePage(value),
                onChangeRowsPerPage: handleChangeRowsPerPage,
                filter: true,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                filterType: 'dropdown',
                responsive: 'standard',
                elevation: 0,
                rowsPerPage: size,
                rowsPerPageOptions: [10, 20, 40, 50, 80, 100],
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
      </div>
      <Modal
        title='Agent Approval'
        open={openApprovalModal}
        okText={approvalLoading ? '...loading' : 'Approve agent'}
        onOk={handleApplicationApproval}
        onClose={() => setopenApprovalModal(false)}
        loading={approvalLoading}
      >
        <p>
          Do you want to approve application from{' '}
          {`${activeAgent.firstName} ${activeAgent.lastName}`}?
        </p>
      </Modal>
      <Modal
        title='Delete Approval'
        open={openDeleteAgent}
        okText={deleteAgentLoading ? '...loading' : 'Delete agent'}
        onOk={handleDeleteAgent}
        onClose={() => setOpenDeleteAgentModal(false)}
        loading={deleteAgentLoading}
      >
        <p>
          Do you want to delete agent
          {`${activeAgent.firstName} ${activeAgent.lastName}`}?
        </p>
      </Modal>
      <Modal
        title={`Transfer ${activeAgent.fullName}'s customers`}
        open={transferModalProps.open}
        okText={transferCustomerLoading ? '...loading' : 'Transfer Customer'}
        onOk={handleTransferCustomer}
        onClose={() => setTransferModalProps({ loading: false, open: false })}
        loading={transferCustomerLoading}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Select Receipient Agent
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={receipientAgent}
              label='Select Receipient Agent'
              onChange={(e) => {
                setReceipientAgent(e.target.value);
              }}
            >
              {[...agentList]
                .filter((agent) => agent.id !== activeAgent.id)
                .map((agt) => (
                  <MenuItem key={agt.id} value={agt.id}>
                    {agt.fullName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default Agents;
