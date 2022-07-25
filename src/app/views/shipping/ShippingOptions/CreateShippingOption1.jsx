import React, { useState, useEffect } from 'react';
import Cost from './components/Cost';
import generateInput from './components/Input';
import { Grid, Box, Divider, Button, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import http from '../../../services/api';
import SingleCondition from './components/SingleCondition';
import { valueToPercent } from '@mui/base';
import uuid from 'react-uuid';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  costInput,
  getCondition,
  calculationUnitEnum,
  conditionNameEnum,
  calculationUnitObj,
  otherSettings,
} from './components/helper';
import { getShippingOptionGroup } from 'app/redux/actions/shippingActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import CustomAlert from 'app/components/Alert';

const ShippingOption = (props) => {
  const history = useHistory();
  const [shippingZones, setShippingZones] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [costState, setCostState] = useState({
    baseCost: '',
    additionalCost: '',
    additionalCostOnEvery: '',
    dimensionUnit: '',
  });
  const [conditions, setConditions] = useState([
    { data: [...calculationUnitObj], id: uuid() },
  ]);

  const [otherSettingsState, setOtherSettingsState] = useState({
    shippingZone: '',
    shippingOptionGroup: '',
    name: '',
  });
  const {
    loading: loadingGroup,
    shipping: shippingGroup,
    error: errorGroup,
  } = useSelector((state) => state.shippingOptionGroupList);
  const [alertData, setAlertData] = useState({
    success: false,
    text: '',
    title: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShippingOptionGroup({}));
    getAllShippingZones();
  }, []);

  const handleAlertModal = () => {
    setIsOpen((prev) => !prev);
  };

  const getAllShippingZones = () => {
    setLoading(true);
    http.get('/afrimash/shipping-zone').then((res) => {
      setShippingZones(res?.data.object);
      setLoading(false);
    });
  };

  const onCostChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErrorFields([]);
    setCostState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOtherSettingsChange = (name, value) => {
    setErrorFields([]);
    setOtherSettingsState((prevState) => ({ ...prevState, [name]: value }));
  };

  const costInputs = costInput.map((input) => {
    return generateInput({
      ...input,
      onChange: onCostChange,
      value: costState[input.name],
    });
  });

  const otherSettingsList = otherSettings.map((input) => {
    if (input.name === 'shippingZone') {
      return generateInput({
        ...input,
        id: uuid(),
        onChange: (event, value) =>
          handleOtherSettingsChange(input.name, value),
        value: otherSettingsState[input.name],
        options: shippingZones,
      });
    }

    if (input.name === 'shippingOptionGroup') {
      return generateInput({
        ...input,
        id: uuid(),
        onChange: (event, value) =>
          handleOtherSettingsChange(input.name, value),
        value: otherSettingsState[input.name],
        options: shippingGroup,
      });
    }

    return generateInput({
      ...input,
      onChange: (event) =>
      handleOtherSettingsChange(event.target.name, event.target.value),
      value: otherSettingsState[input.name],
    });

  });

  const onConditionChange = (name, value, id) => {
    setErrorFields([]);

    let activeConditions = conditions.slice();
    if (name === conditionNameEnum.CALCULATION_UNIT && id === 'main') {
      const calUnitObj = calculationUnitObj[0];
      calUnitObj.value = value;
      const otherObj = getCondition(value);
      activeConditions[0] = {
        ...activeConditions[0],
        data: [calUnitObj, ...otherObj],
      };
      setConditions(activeConditions);
    } else if (id === 'main') {
      let mainCond = activeConditions[0].data.map((dat) => {
        if (dat.name === name) {
          dat.value = value;
        }
        return dat;
      });
      activeConditions[0] = { ...activeConditions[0], data: mainCond };
      setConditions(activeConditions);
    } else {
      let selectedCond = activeConditions.find((cond) => cond.id === id);
      if (name === conditionNameEnum.CALCULATION_UNIT) {
        const calUnitObj = calculationUnitObj[0];
        calUnitObj.value = value;
        const otherObj = getCondition(value);
        selectedCond = { ...selectedCond, data: [calUnitObj, ...otherObj] };
        activeConditions = activeConditions.map((data) => {
          if (data.id === id) {
            return selectedCond;
          }
          return data;
        });
        setConditions(activeConditions);
      } else {
        let thisCondition = selectedCond.data.map((dat) => {
          if (dat.name === name) {
            dat.value = value;
          }
          return dat;
        });

        selectedCond = { ...selectedCond, data: thisCondition };
        activeConditions = activeConditions.map((data) => {
          if (data.id === id) {
            return selectedCond;
          }
          return data;
        });

        setConditions(activeConditions);
      }
    }
  };

  const onDeleteCondition = (id) => {
    const newConditions = [...conditions].filter((cond) => cond?.id !== id);
    setConditions(newConditions);
  };

  const handleAddCondition = () => {
    const condUnit = { ...calculationUnitObj[0], value: '' };
    setConditions((prevState) => [
      ...prevState,
      { id: uuid(), data: [condUnit] },
    ]);
  };

  const handleCreateShippingOptions = async () => {
    try {
      let emptyFields = [];
      const otherSettingsFinal = {};

      const conditionsData = [...conditions].map((cond) => {
        let singleCond = { ...costState };
        cond.data.forEach((dat) => {
          if (!dat.value) {
            emptyFields.push(dat.name);
          } else if (
            typeof dat.value === 'object' &&
            !Array.isArray(dat.value)
          ) {
            singleCond[dat.name] = dat.value.id;
          } else {
            singleCond[dat.name] = dat.value;
          }
        });

        return singleCond;
      });

      Object.entries(otherSettingsState).forEach(([key, value]) => {
        if (!value) {
          emptyFields.push(key);
        } else if (
          typeof value === 'object' &&
          !Array.isArray(value)
        ) {
          otherSettingsFinal[key] = value.id;
        }else {
          otherSettingsFinal[key] = value;
        }
      });

      if (emptyFields.length > 0) {
        setErrorFields(emptyFields);
        console.log({ emptyFields });
      } else {
        const finalData = {
          ...otherSettingsFinal,
          conditions: conditionsData,
        };

        console.log({ finalData });

        const response = await http.post_new(
          `/afrimash/shipping-option`,
          finalData,
        );
        console.log(response);
        setAlertData({
          success: true,
          text: 'Shipping option created sucessfully',
          title: 'Shipping Option Created',
        });
        handleAlertModal();
      }
    } catch (e) {
      console.log(e);
      if(e.response){
        setAlertData({
          success: false,
          text: 'Invalid details provided',
          title: e?.response?.data?.errorMsg,
        });
      }else {
        setAlertData({
          success: false,
          text: 'Invalid details provided',
          title: 'Unable to create shipping option',
        });
      }
      
      handleAlertModal();
    }
  };

  const subCondtions = [...conditions].slice(1).map((cond, index) => {
    return (
      <Box key={cond.id}>
        <Box py={4} display='flex' width='100%'>
          <Box mt={2} mr={2}>
            {index + 1}
          </Box>
          <Box width='100%'>
            <SingleCondition
              key={cond.id}
              id={cond.id}
              onChange={(name, value, id) => onConditionChange(name, value, id)}
              data={cond.data}
            />
          </Box>
        </Box>
        <IconButton size='small' onClick={() => onDeleteCondition(cond.id)}>
          <RiDeleteBin6Line style={{ color: '#DA0032' }} />
        </IconButton>
        <Divider />
      </Box>
    );
  });

  return (
    <div className='m-sm-30'>
      <Grid container spacing={3}>
        {errorFields.length > 0 && (
          <Grid item sx={12} md={12}>
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              The following are empty
              <ul>
                {errorFields.map((err) => (
                  <li key={uuid()}>{err}</li>
                ))}
              </ul>
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Box p={3} border={1} borderColor='grey.500' borderRadius={3}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box fontSize='h6.fontSize'>Main Condition</Box>

              <Button
                variant='contained'
                color='primary'
                onClick={handleAddCondition}
              >
                Add Condition
              </Button>
            </Box>

            <SingleCondition
              onChange={(name, value, id) =>
                onConditionChange(name, value, 'main')
              }
              data={conditions[0].data}
              id={conditions[0]?.id}
            />
          </Box>

          {conditions.length > 1 && (
            <Box
              p={3}
              border={1}
              mt={3}
              borderColor='grey.500'
              borderRadius={3}
            >
              <Box fontSize='h6.fontSize'>Sub Condition</Box>
              {subCondtions}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={3} border={1} borderColor='grey.500' borderRadius={3}>
            <Box fontSize='h6.fontSize'>Cost</Box>
            {costInputs}
          </Box>
          <Box p={3} border={1} mt={3} borderColor='grey.500' borderRadius={3}>
            <Box fontSize='h6.fontSize'>Other Settings</Box>
            {otherSettingsList}
          </Box>
          <Box
            mt={2}
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleCreateShippingOptions}
            >
              Create Shipping Option
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CustomAlert
        isOpen={isOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={() => {
          history.push('/shipping-options')
        }}
      />
    </div>
  );
};

export default ShippingOption;
