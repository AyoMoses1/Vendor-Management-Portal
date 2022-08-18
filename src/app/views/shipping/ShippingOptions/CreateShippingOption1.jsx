import React, { useState, useEffect } from 'react';
import generateInput from './components/Input';
import { Grid, Box, Divider, Button, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import http from '../../../services/api';
import SingleCondition from './components/SingleCondition';
import uuid from 'react-uuid';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  costInput,
  getCondition,
  calculationUnitEnum,
  conditionNameEnum,
  calculationUnitObj,
  otherSettings,
  minMaxCriteriaValue,
  criteriaVal,
  dimensionsObj,
  baseCostDefinition,
  requiredFields,
} from './components/helper';
import { getShippingOptionGroup } from 'app/redux/actions/shippingActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import CustomAlert from 'app/components/Alert';
import services from './services';

const ShippingOption = ({ location }) => {
  const { id } = location?.state;
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
  const { shipping: shippingGroup } = useSelector(
    (state) => state.shippingOptionGroupList,
  );
  const [alertData, setAlertData] = useState({
    success: false,
    text: '',
    title: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      if (id) {
        let {
          data: {
            object: { conditions, shippingZone, shippingOptionGroup, name },
          },
        } = await services.getShippingOptionDetails(id);
      
        const cost = {
          baseCost: conditions[0].baseCost,
          additionalCost: conditions[0].additionalCost,
          additionalCostOnEvery: conditions[0].additionalCostOnEvery,
          dimensionUnit: conditions[0].dimensionUnit,
        };

        conditions = conditions.map((cond) => {
          const calculationUnit = {
            ...calculationUnitObj[0],
            value: cond['calculationUnit'],
          };
          const methodCondition = getCondition(calculationUnit.value);
          let dimensionParams = [];
          let criteriaVall = [];
          let rangeParams = [];

          if (calculationUnit.value === 'SHIPPING_CLASS') {
            methodCondition[0].value = cond.shippingClass;
          } else if (calculationUnit.value === 'DIMENSION') {
            methodCondition[0].value = cond.methodCondition;
            dimensionParams = dimensionsObj.map((data) => {
              return {
                ...data,
                value: cond[data.name],
              };
            });
          } else {
            methodCondition[0].value = cond.methodCondition;
          }

          if (cond.methodCondition === 'RANGE') {
            rangeParams = minMaxCriteriaValue.map((data) => {
              return {
                ...data,
                value: cond[data.name],
              };
            });
          }
          if (cond.criteriaValue) {
            criteriaVall = criteriaVal;
            criteriaVall[0].value = cond.criteriaValue;
          }

          return {
            data: [
              calculationUnit,
              ...methodCondition,
              ...rangeParams,
              ...dimensionParams,
              ...criteriaVall,
            ],
            id: cond.id,
          };
        });
        setConditions(conditions);
        setCostState(cost);
        setOtherSettingsState({ shippingOptionGroup, shippingZone, name });
      }
    })();
  }, [id]);

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
    setCostState((prevState) => ({ ...prevState, [name]: value }));
    setErrorFields([]);
  };

  const handleOtherSettingsChange = (name, value) => {
    setOtherSettingsState((prevState) => ({ ...prevState, [name]: value }));
    setErrorFields([]);
  };

  /* const costInputs = (conditions[0].data[0].value === 'SUB_TOTAL'
    ? [costInput[0], ...baseCostDefinition, ...costInput.slice(1)]
    : costInput
  ).map((input) => {
    return generateInput({
      ...input,
      onChange: onCostChange,
      value: costState[input.name],
    });
  }); */

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

  const handleMethodCondition = (thisCondition, name, value) => {
    if (name === conditionNameEnum.METHOD_CONDITION && value === 'RANGE') {
      thisCondition = [...thisCondition.slice(0, 2), ...minMaxCriteriaValue];

      if (thisCondition[0].value === calculationUnitEnum.DIMENSION) {
        return [...thisCondition.slice(0, 4), ...dimensionsObj];
      }
    }

    if (name === conditionNameEnum.METHOD_CONDITION && value !== 'RANGE') {
      thisCondition = [...thisCondition.slice(0, 2), ...criteriaVal];

      if (thisCondition[0].value === calculationUnitEnum.DIMENSION) {
        return [...thisCondition.slice(0, 3), ...dimensionsObj];
      }
    }

    return thisCondition;
  };

  const onConditionChange = (name, value, id) => {
    const activeConditions = [...conditions];
    if (name === conditionNameEnum.CALCULATION_UNIT && id === 'main') {
      const calUnitObj = { ...calculationUnitObj[0] };
      calUnitObj.value = value;
      const otherObj = getCondition(value);
      const thisCond = activeConditions.slice(0, 1);
      
      const firstConditions = {
        ...thisCond[0],
        data: [calUnitObj, ...otherObj],
      };
      setConditions([firstConditions, ...activeConditions.slice(1)]);
    } else if (name !== conditionNameEnum.CALCULATION_UNIT && id === 'main') {
      const thisCond = activeConditions.slice(0, 1);

      let mainCond = [...thisCond[0].data?.slice()].map((dat) => {
        if (dat.name === name) {
          return {
            ...dat,
            value,
          };
        }
        return dat;
      });

      mainCond = handleMethodCondition(mainCond, name, value);

      const firstConditions = { ...thisCond.slice(0, 1)[0], data: mainCond };
    
      setConditions([firstConditions, ...activeConditions.slice(1)]);
    } else {
      const selectedCond = [...activeConditions].find((cond) => cond.id === id);

      if (name === conditionNameEnum.CALCULATION_UNIT) {
        const calUnitObj = { ...calculationUnitObj[0] };
        calUnitObj.value = value;
        const otherObj = getCondition(value);
        const newCond = { ...selectedCond, data: [calUnitObj, ...otherObj] };
        const newConditions = activeConditions.map((data) => {
          if (data.id === newCond.id) {
            return newCond;
          }
          return data;
        });
        setConditions(newConditions);
      } else {
        let thisCondition = [...selectedCond.data].map((dat) => {
          if (dat.name === name && selectedCond.id === id) {
            return {
              ...dat,
              value,
            };
          }
          return dat;
        });

        thisCondition = handleMethodCondition(thisCondition, name, value);

        const newCond = { ...selectedCond, data: thisCondition };

        const newActiveCond = activeConditions.map((data) => {
          if (data.id === newCond.id) {
            return newCond;
          }
          return data;
        });

        setConditions(newActiveCond);
      }
    }

    setErrorFields([]);
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
          if (!dat.value && requiredFields.some((val) => val === dat.name)) {
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

        if(id){
          singleCond.id = cond.id;
        }

        return singleCond;
      });

      Object.entries(costState).forEach(([key, value]) => {
        if (!value && requiredFields.some((val) => val === key)) {
          emptyFields.push(key);
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          otherSettingsFinal[key] = value.id;
        } else {
          otherSettingsFinal[key] = value;
        }
      });

      Object.entries(otherSettingsState).forEach(([key, value]) => {
        if (!value && requiredFields.some((val) => val === key)) {
          emptyFields.push(key);
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          otherSettingsFinal[key] = value.id;
        } else {
          otherSettingsFinal[key] = value;
        }
      });

      if (emptyFields.length > 0) {
        setErrorFields(emptyFields);
    
      } else {
        const finalData = {
          ...otherSettingsFinal,
          conditions: conditionsData,
        };

        if(id){
          finalData.id = id;
        }

  
        if(id){
          await services.updateShippingOption(finalData);
        }else{
          await services.createShippingOption(finalData);
        }


        setAlertData({
          success: true,
          text: 'Shipping option created sucessfully',
          title: 'Shipping Option Created',
        });
        handleAlertModal();
      }
    } catch (e) {
      if (e.response) {
        setAlertData({
          success: false,
          text: 'Invalid details provided',
          title: e?.response?.data?.errorMsg,
        });
      } else {
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
        <Grid item sx={12} md={12}>
          <Box fontSize='h4.fontSize'>Create Shipping Option</Box>
        </Grid>
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
              key={conditions[0]?.id}
              onChange={(name, value, id) =>
                onConditionChange(name, value, 'main')
              }
              data={conditions[0]?.data}
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
             {id?  'Update Shipping Option' : 'Create Shipping Option'}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CustomAlert
        isOpen={isOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={() => {
          history.push('/shipping-options');
        }}
      />
    </div>
  );
};

export default ShippingOption;
