/* eslint react/prop-types: 0 */
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Alert } from 'react-bootstrap';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

const sortOptions =
  ([
    'Offense', 'Control', 'Fear', 'Defense', 'Utility'
  ]).map((type) => {
    return <MenuItem key={{type} + 'MenuItem'} value={type}>{<div>{type}</div>} </MenuItem>;
  });

const complexities = [ 'Low', 'Moderate', 'High', 'Very high' ];

function Intro(props) {
  const sortType = props.sortType;

  const handleChange = (event) => {
    props.setSortType({type: event.target.value, direction: sortType.direction});
  };

  const toggleSortDirection = () => {
    props.setSortType({type: sortType.type, direction: sortType.direction === '-' ? '+' : '-'});
  };

  return <Alert variant='primary'>
    <FormControl>
      <Select
      value={sortType.type}
      onChange={handleChange}
      label="Sort by"
      >
        {sortOptions}
      </Select>
    <NorthIcon color={sortType.direction === '-' ? 'disabled' : 'primary'} onClick={toggleSortDirection}/>
    <SouthIcon color={sortType.direction === '-' ? 'primary' : 'disabled'} onClick={toggleSortDirection}/>
    </FormControl>
    {complexities.map((complexity) => {
      return <Button
        key={complexity}
        variant={props.complexityFilters[complexity] ? "contained" : "outlined"}
        onClick={() => {
          const complexityFilters = {...props.complexityFilters};
          complexityFilters[complexity] = !complexityFilters[complexity];
          props.setComplexityFilters(complexityFilters);
        }}
        >
          {complexity}
          </Button>;
    })}
  </Alert>;
}

export default Intro;
