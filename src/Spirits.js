/* eslint react/prop-types: 0 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Chart, { ValueAxis, CommonSeriesSettings, SeriesTemplate, Size } from 'devextreme-react/chart';
import { Legend } from 'devextreme-react/bar-gauge';

const spirits = require('./config/spirits.json');

const spiritToImage = (_name) => {
  const name = _name.replaceAll(' ', '_');
  return `spirit-island/assets/spirits/${name}.png`;
};

const parsedSortType = (sortType) => {
  return  {
    'Offense+': { index: 0, direction: '>'},
    'Offense-': { index: 0, direction: '<'},
    'Control+': { index: 1, direction: '>'},
    'Control-': { index: 1, direction: '<'},
    'Fear+': { index: 2, direction: '>'},
    'Fear-': { index: 2, direction: '<'},
    'Defense+': { index: 3, direction: '>'},
    'Defense-': { index: 3, direction: '<'},
    'Utility+': { index: 4, direction: '>'},
    'Utility-': { index: 4, direction: '<'},
  }[sortType];
};

const sortBySortType = (sortType) => {
  const {index, direction} = parsedSortType(sortType);

  if(direction === '<') {
    return (a, b) => b.summary[index] - a.summary[index];
  }
  else
  {
    return (a, b) => a.summary[index] - b.summary[index];
  }
};

const summaryToBarData = (s) => {
  return [
    { label: "Offense", value: s[0]},
    { label: "Control", value: s[1]},
    { label: "Fear", value: s[2]},
    { label: "Defense", value: s[3]},
    { label: "Utility", value: s[4]},
  ];
};

const palette = [
  '#ED5564',
  '#4FC1E8',
  '#AC92EB',
  '#A0D568',
  '#FFCE54',
];

const spiritCards = spirits.map((spirit) => {
  return <Card sx={{ maxWidth: 345 }} key={spirit.name}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={spiritToImage(spirit.name)}
        alt= {spirit.name}
                      >
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {spirit.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {spirit.complexity} complexity
        </Typography>
        <Chart
          palette={palette}
          dataSource={summaryToBarData(spirit.summary)}>
            <Size height={150} />

          <CommonSeriesSettings
            argumentField="label"
            valueField="value"
            type="bar"
            ignoreEmptyPoints={true}
          />
          <ValueAxis label={{visible: false}} />
          <SeriesTemplate nameField="label" />
          <Legend visible={false} />
        </Chart>
        <Typography variant="body2" color="text.secondary">
          {spirit.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>;
});

const spiritToSpiritCard = (spirit) => {
  return spiritCards.find(a => {
    return a.key === spirit.name; // lil hacky but eh
  });
};

function Spirits(props) {
  const sortedSpirits = [...spirits].sort(sortBySortType(props.sortType));

  return <div className='Game'>
    <Container>
      <Row>
        {sortedSpirits.map((spirit) => spiritToSpiritCard(spirit))}
      </Row>
    </Container>
      </div>;
}

export default Spirits;
