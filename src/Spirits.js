/* eslint react/prop-types: 0 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Chart, { ValueAxis, CommonSeriesSettings, SeriesTemplate, Size } from 'devextreme-react/chart';
import { Legend } from 'devextreme-react/bar-gauge';

const spirits = require('./config/spirits.json');

const spiritToImage = (_name) => {
  const name = _name.replaceAll(' ', '_');
  return `${process.env.PUBLIC_URL}/assets/spirits/${name}.png`;
};

const sortTypeToIndex = (sortType) => {
  return  {
    'Offense': 0,
    'Control': 1,
    'Fear': 2,
    'Defense': 3,
    'Utility': 4,
  }[sortType];
};

const sortBySortType = (sortType) => {
  const index = sortTypeToIndex(sortType.type);

  if(sortType.direction === '-') {
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
  const barData = summaryToBarData(spirit.summary);
  const spiritImage = spiritToImage(spirit.name);

  return <Card sx={{ maxWidth: 345 }} key={spirit.name}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={spiritImage}
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
          dataSource={barData}>
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
  const sortedSpirits = spirits
    .filter((v) => props.complexityFilters[v.complexity])
    .sort(sortBySortType(props.sortType));

  return <div className='Game'>
    <Container>
      <Row>
        {sortedSpirits.map((spirit) => spiritToSpiritCard(spirit))}
      </Row>
    </Container>
      </div>;
}

export default Spirits;
