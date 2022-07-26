import React from 'react';
import generateInput from './Input';
import { Box } from '@material-ui/core';

const Cost = ({ onChange, value }) => {
  const inputObj = [
    {
      type: 'number',
      name: 'baseCost',
      label: 'Base Cost',
    },
    {
      type: 'number',
      name: 'additionalCost',
      label: 'Additional Cost',
    },
    {
      type: 'number',
      name: 'additionalCostOnEvery',
      label: 'Additional Cost on every',
    },
    {
      type: 'select',
      name: 'dimensionUnit',
      label: 'Select dimension unit',
      menu: ['ML', 'CM', 'G', 'ITEM_QTY'],
    },
  ];

  const inputFields = inputObj.map((input) => {
    return generateInput({ ...input, onChange, value });
  });

  return <Box>{inputFields}</Box>;
};

export default Cost;
