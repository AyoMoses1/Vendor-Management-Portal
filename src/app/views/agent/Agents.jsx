import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAgents,
  approveAgentApplication,
  deleteAgent,
  transferCustomer,
  getAgentTypes
} from 'app/redux/actions/agents-action';
import './style.scss';
import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';
import Modal from '../../components/Modal';
import './agent.css';
import { debounce } from 'lodash';
import { states } from '../../../utils/states';
states.unshift('All');

const Agents = () => {
  const { agentList, total, error, severity, loading, pages } =
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
  const { agentTypes } = useSelector(
    (state) => state.getAgentTypes,
  );
  const [id, setId] = useState(0);
  const [openApprovalModal, setopenApprovalModal] = useState(false);
  const [activeAgent, setActiveAgent] = useState({});
  const [openDeleteAgent, setOpenDeleteAgentModal] = useState(false);
  const [transferModalProps, setTransferModalProps] = useState({
    open: false,
    loading: false,
  });
  const [receipientAgent, setReceipientAgent] = useState('');
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10);
  const [query, setQuery] = useState('');
  const [state, setState] = useState('All')
  const [types, setTypes] = useState([{ name: 'All Agents', value: 'ALL' }]);
  const [agentType, setAgentType] = useState('ALL');
  const [title, setTitle] = useState('All Agents')

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const _agentType = agentType === 'ALL' ? '' : agentType;
    const _state = state === 'All' ? '' : state;
    dispatch(getAllAgents({ page, size, query, agentType: _agentType, state: _state }));
  }, [size, page, agentType, state]);

  useEffect(() => {
    dispatch(getAgentTypes());
  }, []);

  useEffect(() => {
    const allTypes = types;
    if (agentTypes && agentTypes.length) {
      agentTypes.map(a => {
        allTypes.push({ name: a.split('_').join(" "), value: a })
      })
      setTypes(allTypes);
    }
  }, [agentTypes])

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
    const _agentType = agentType === 'ALL' ? '' : agentType;
    const _state = state === 'All' ? '' : state;
    dispatch(getAllAgents({ page, size, query, agentType: _agentType, state: _state }));
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
                <h5 className='my-0 text-1 text-control'>{`${user?.firstName} ${user?.lastName}`}</h5>
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
                <h5 className='my-0 text-control'>{user?.mobileNo}</h5>
            </Link>
          );
        },
      },
    },

    {
      name: 'email', // field name in the row object
      label: 'Email', // column title that will be shown in table
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
                <h5 className='my-0 text-control'> {user?.email}</h5>
            </Link>
          );
        },
      },
    },

    {
      name: 'dateRegistered', // field name in the row object
      label: 'Date Registered', // column title that will be shown in table
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
                  {user?.dateRegistered || '-----'}
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
      label: 'Status', // column title that will be shown in table
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex];
          setId(user.id);
          return (
            <div className={`flex items-center`}>
            <div className={`ml-3  agent__status  ${user?.status}`}>
            <Link
              to={{
                pathname: "/agent/details",
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className="ml-3 mr-4"
            >
              <span className='text'>{user?.status || '------'}</span>
            </Link>
          </div>
        </div>
          );
        },
      },
    },
    {
      name: 'actions',
      label: 'Quick Actions',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex, another) => {
          let user = agentList[dataIndex];
          return (
            <>
              <Link
                to={{
                  pathname: '',
                  state: {
                    id: user.id,
                    user,
                  },
                }}
              >
                <MenuItem>Activate</MenuItem>
                
              </Link>
              
            </>
          );
        },
      },
    },
  ];

  const debouncedAgents = debounce(value => {
    const _agentType = agentType === 'ALL' ? '' : agentType;
    const _state = state === 'All' ? '' : state;
    if (value.length > 0) {
      dispatch(getAllAgents({ page, size, query: value, agentType: _agentType, state: _state }));
      setQuery(value);
    } else {
      dispatch(getAllAgents({ page, size, query: '', agentType: _agentType, state: _state }));
      setQuery('');
    }
  }, 700);


  const performSearch = (value) => {
    debouncedAgents(value)
  }

  const handleTitle = (value) => {
    const v = types.find(t => t.value === value).name;
    setTitle(v);
  }

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
              title={<div>
                <h4 className='mt-4 mb-0'>{title}</h4>
                
              </div>}
              data={[...agentList]}
              columns={columns}
              options={{
                serverSide: true,
                selectableRows: "none",
                count: total,
                page: page,
                setTableProps: () => ({ className: "agent-table" }),
                onChangePage: (value) => handleChangePage(value),
                filter: true,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                filterType: 'dropdown',
                responsive: 'standard',
                elevation: 0,
                rowsPerPage: size,
                onChangeRowsPerPage: (x) => {
                  setSize(x)
                },
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
                        onChange={({ target: { value } }) => { handleSearch(value); performSearch(value) }
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
                            <IconButton onClick={() => {
                              hideSearch();
                              const _agentType = agentType === 'ALL' ? '' : agentType;
                              const _state = state === 'All' ? '' : state;
                              dispatch(getAllAgents({ page, size, query: '', agentType: _agentType, state: _state }));
                              setQuery('');
                            }}>
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
