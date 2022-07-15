import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Chart } from 'devextreme-react';
import { ValueAxis, CommonSeriesSettings, SeriesTemplate } from 'devextreme-react/chart';
import { Legend } from 'devextreme-react/bar-gauge';

const spirits = require('./config/spirits.json');

function importAll(r) {
  return r.keys().map(r).map( (a) => a.default);
}

const spiritImages = importAll(require.context('./assets/spirits', false, /\.(png|jpe?g|svg)$/));

const spiritToImage = (name) => {
  return spiritImages.find(v => v.match(name.split(" ")[0]));
};

const PadRemainingSpace = <Col/>;

const sortByOffenseAscending = (a, b) => {
  return b.summary[0] - a.summary[0];
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

function Spirits() {
  const sortedSpirits = spirits.sort(sortByOffenseAscending);

  return <div className='Game'>
    <Container>
      <Row>
        {sortedSpirits.map((spirit) => {
          return <Card sx={{ maxWidth: 345 }} key={spirit.name}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={spiritToImage(spirit.name)}
                alt= {spirit.name}
                              />
              <CardContent>
                <Chart
                  palette={palette}
                  dataSource={summaryToBarData(spirit.summary)}>

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
                <Typography gutterBottom variant="h5" component="div">
                  {spirit.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {spirit.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>;
        })}
        {PadRemainingSpace}
      </Row>
    </Container>
  </div>;
}

export default Spirits;
