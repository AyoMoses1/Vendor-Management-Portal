/* eslint-disable default-case */
import React from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const generateInput = ({
  id,
  type,
  name,
  onBlur,
  onChange,
  value,
  touched,
  errors,
  options,
  disabled,
  required,
  label,
  getOptionLabel,
  menu,
  getOptionSelected,
}) => {
  switch (type) {
    case 'text':
    case 'number':
      return (
        <TextField
          name={name}
          key={`${name}-${id}`}
          type={type}
          disabled={disabled}
          label={label}
          variant='outlined'
          margin='normal'
          fullWidth
          onChange={onChange}
          value={value}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          name={name}
          key={`${name}-${id}`}
          options={options}
          disabled={disabled}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          onChange={onChange}
          value={value}
          defaultValue={value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant='outlined'
              required={required}
              margin='normal'
            />
          )}
        />
      );
    case 'select':

      return (
        <FormControl    className='mt-4' variant='outlined'  key={`${name}-${id}`} style={{width: '100%'}}>
          <InputLabel htmlFor='outlined-age-native-simple'>{label}</InputLabel>
          <Select
            value={value}
            onChange={onChange}
            label={label}
            inputProps={{
              name,
              id: 'outlined-age-native-simple',
            }}
          >
            {options.map((option) => {
              return <MenuItem value={option.value} key={option.name}>{option.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
  }
};

export default generateInput;
