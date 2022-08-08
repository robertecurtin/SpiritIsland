/* eslint react/prop-types: 0 */
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Alert } from 'react-bootstrap';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';


const radioButtons =
  ([
    'Offense', 'Control', 'Fear', 'Defense', 'Utility'
  ]).map((type) => {
    return <><FormControlLabel key={{type} + '-'} value={type + '-'} control={<Radio />} label={<div>{type} <SouthIcon/></div>} />
      <FormControlLabel key={{type} + '+'} value={type + '+'} control={<Radio />} label={<div>{type} <NorthIcon/></div>} /></>;
  });

const complexities = [ 'Low', 'Moderate', 'High', 'Very high' ];

function Intro(props) {

  const handleChange = (event) => {
    props.setSortType(event.target.value);
  };

  return <Alert variant='primary'>
    <FormControl>
      <FormLabel id='sort-label-group'>Sort by</FormLabel>
      <RadioGroup
      row
      aria-labelledby='sort-label-group'
      name='sort-radio-buttons-group'
      value={props.sortType}
      onChange={handleChange}
      >
        {radioButtons}
      </RadioGroup>
    </FormControl>
    {complexities.map((complexity) => {
      console.log(props.complexityFilters);
      console.log(props.complexityFilters[complexity]);
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