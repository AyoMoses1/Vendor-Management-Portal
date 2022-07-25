export const costInput = [
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
      options: [
        { value: 'ML', name: 'Milliliter' },
        { value: 'CM', name: 'Centimeter' },
        { value: 'G', name: 'Gram' },
        { value: 'ITEM_QTY', name: 'Item Quantity' },
      ],
    },
  ];


  export const otherSettings = [
    {
      type: 'text',
      name: 'name',
      label: 'Option Name',
      value: '',
    },
    {
      name: 'shippingZone',
      label: 'Select Shipping Zone',
      getOptionLabel: (option) => option.name,
      getOptionSelected: (option, value) => option.id === value.id,
      type: 'autocomplete',
      value: '',
    },
    {
      name: 'shippingOptionGroup',
      label: 'Select Shipping Option Group',
      getOptionLabel: (option) => option.name,
      getOptionSelected: (option, value) => option.id === value.id,
      type: 'autocomplete',
      value: '',
    },
  ];


  export const conditionNameEnum = {
    CALCULATION_UNIT: 'calculationUnit',
    SHIPPING_CLASS: 'shippingClass',
    METHOD_CONDITION: 'methodCondition',
    CRITICAL_VALUE: 'criteriaValue',
    WIDTH: 'width',
    LENGTH: 'length'
  }

const shippingClassObj = [
    {
      name: conditionNameEnum.SHIPPING_CLASS,
      label: 'Shipping class',
      getOptionLabel: (option) => option.name,
      getOptionSelected: (option, value) => option.id === value.id,
      type: 'autocomplete',
      value: '',
    },
  ];
  
  const regularObj = [
    {
      type: 'select',
      name: conditionNameEnum.METHOD_CONDITION,
      label: 'Method Condition',
      value: '',
      options: [
        { value: 'GREATER_THAN', name: 'Greater Than' },
        { value: 'LESS_THAN', name: 'Less Than' },
        { value: 'EQUAL_TO', name: 'Equal to' },
        { value: 'RANGE', name: 'Range' },
      ],
    },
    {
      type: 'number',
      name: conditionNameEnum.CRITICAL_VALUE,
      label: 'Criteria value',
      value: '',
    },
  ];
  
  const dimensionsObj = [
    ...regularObj,
    {
      type: 'number',
      name: conditionNameEnum.WIDTH,
      label: 'Dimension width',
      value: '',
    },
    {
      type: 'number',
      name: conditionNameEnum.LENGTH,
      label: 'Dimension length',
      value: '',
    },
  ];

  export const calculationUnitObj = [
    {
      name: conditionNameEnum.CALCULATION_UNIT,
      label: 'Calculation Unit',
      type: 'select',
      options: [
        { value: 'SHIPPING_CLASS', name: 'Shipping Class' },
        { value: 'DIMENSION', name: 'Dimension' },
        { value: 'VOLUME', name: 'Volume' },
        { value: 'WEIGHT', name: 'Weight' },
      ],
    },
  ];


 


  export const calculationUnitEnum = {
    SHIPPING_CLASS: 'SHIPPING_CLASS',
    DIMENSION: 'DIMENSION',
    VOLUME: 'VOLUME',
    WEIGHT: 'WEIGHT',
  };



  export const getCondition = (cond) => {
    switch (cond) {
      case calculationUnitEnum.SHIPPING_CLASS:
        return shippingClassObj;
      case calculationUnitEnum.DIMENSION:
        return dimensionsObj;
      case calculationUnitEnum.VOLUME:
      case calculationUnitEnum.WEIGHT:
        return regularObj;
      default:
        return '';
    }
  };

