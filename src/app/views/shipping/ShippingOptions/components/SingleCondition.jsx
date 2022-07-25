import React, { useState, useEffect } from 'react';
import generateInput from './Input';
import { Box } from '@material-ui/core';
import http from '../../../../services/api';
import { conditionNameEnum } from './helper';


const SingleCondition = ({ data, onChange, id }) => {
  const [shippingClassList, setShippingClass] = useState([]);

  const getAllShippingClasses = () => {
    http.get('/afrimash/shipping-class').then((res) => {
      setShippingClass(res?.data.object);
    });
  };

  useEffect(() => {
    getAllShippingClasses();
  }, []);

  const onShippingClassConditionChange = (event, value) => {
    onChange('shippingClass', value, id);
  };

  const onConditionChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    onChange(name, value, id);
  };

  const conditionsArray = [...data].map((cond) => {
    if (cond.name === conditionNameEnum.SHIPPING_CLASS) {
      return generateInput({
        ...cond,
        id,
        onChange: onShippingClassConditionChange,
        value: cond.value,
        options: shippingClassList,
      });
    }
    return generateInput({
      ...cond,
      id,
      onChange: onConditionChange,
      value: cond.value,
    });
  });

  return <Box width='100%'>{conditionsArray}</Box>;
};

export default SingleCondition;
