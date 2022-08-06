/* eslint react/prop-types: 0 */
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Alert } from 'react-bootstrap';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

function Intro(props) {

  const handleChange = (event) => {
    props.setSortType(event.target.value);
  };

  const sortTypes = [
    'Offense', 'Control', 'Fear', 'Defense', 'Utility'
  ];

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
        {sortTypes.map((type) => {
          return <><FormControlLabel key={{type} + '-'} value={type + '-'} control={<Radio />} label={<div>{type} <SouthIcon/></div>} />
            <FormControlLabel key={{type} + '+'} value={type + '+'} control={<Radio />} label={<div>{type} <NorthIcon/></div>} /></>;
        })}
      </RadioGroup>
    </FormControl>
  </Alert>;
}

export default Intro;
