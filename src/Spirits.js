/* eslint react/prop-types: 0 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Card, CardActionArea, CardContent, CardMedia, Dialog, ImageList, ImageListItem, Typography } from '@mui/material';
import Chart, { ValueAxis, CommonSeriesSettings, SeriesTemplate, Size } from 'devextreme-react/chart';
import { Legend } from 'devextreme-react/bar-gauge';

const spirits = require('./config/spirits.json');

const spiritToImage = (_name) => {
  const name = _name.replaceAll(' ', '_');
  return `${process.env.PUBLIC_URL}/assets/spirits/${name}.png`;
};

const powerToImage = (_name) => {
  const name = _name.replaceAll(' ', '_').replace(/\W/g, '').toLowerCase();
  return `${process.env.PUBLIC_URL}/assets/powers/${name}.webp`;
};

const spiritToFrontOfPlayerBoard = (_name) => {
  const name = _name.replaceAll(' ', '_');
  return `${process.env.PUBLIC_URL}/assets/playerboards/${name}_front.jpg`;
};

const spiritToBackOfPlayerBoard = (_name) => {
  const name = _name.replaceAll(' ', '_');
  return `${process.env.PUBLIC_URL}/assets/playerboards/${name}_back.jpg`;
};

const sortTypeToIndex = (sortType) => {
  return  {
    'Offense': 0,
    'Control': 1,
    'Fear': 2,
    'Defense': 3,
    'Utility': 4,
    'Random spirit': 0
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

const spiritPowers = spirits.map((spirit) => {
  return { name: spirit.name, content: <>
    <ImageList>
      {spirit.cards.map((cardname) =>
        <ImageListItem key={cardname}>
          <img src={powerToImage(cardname)} />
        </ImageListItem>
        )
      }
    </ImageList>
  </>};
});

const playerBoard = (spirit, frontOfBoardShowing, setFrontOfBoardShowing) => {
  return (spirit &&
    <img
      src={frontOfBoardShowing ? spiritToFrontOfPlayerBoard(spirit) : spiritToBackOfPlayerBoard(spirit)}
      onClick={() => setFrontOfBoardShowing(!frontOfBoardShowing)}
      />)
    || <div />;
};

const spiritToSpiritPowers = (spirit) => {
  return (spirit && spiritPowers.find(a => {
    return a.name === spirit;
  }).content) || <div />;
};

const spiritCards = spirits.map((spirit) => {
  const barData = summaryToBarData(spirit.summary);
  const spiritImage = spiritToImage(spirit.name);

  return <CardActionArea key={spirit.name}>
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
    </CardActionArea>;
});

const spiritToSpiritCard = (spirit) => {
  return spiritCards.find(a => {
    return a.key === spirit.name; // lil hacky but eh
  });
};

function Spirits(props) {
  const [selectedSpirit, setSelectedSpirit] = React.useState(false);
  const [frontOfBoardShowing, setFrontOfBoardShowing] = React.useState(true);
  const sortedSpirits = spirits
    .filter((v) => props.complexityFilters[v.complexity])
    .sort(sortBySortType(props.sortType));

  if(props.sortType.type === 'Random spirit' && sortedSpirits.length > 0) {
    return spiritToSpiritCard(sortedSpirits[Math.floor(Math.random()*sortedSpirits.length)]);
  }
  else {
    return <Container>
      <Row>
        <Dialog
          open={selectedSpirit !== false}
          onClose={() => { setSelectedSpirit(false); setFrontOfBoardShowing(true); }}
          >
          {playerBoard(selectedSpirit, frontOfBoardShowing, setFrontOfBoardShowing)}
          {spiritToSpiritPowers(selectedSpirit)}
        </Dialog>
        {sortedSpirits.map((spirit) =>
        <Card sx={{ maxWidth: 345 }} key={`${spirit.name}_sorted`} onClick={() => setSelectedSpirit(spirit.name)}>
          {spiritToSpiritCard(spirit)}
        </Card>
        )}
      </Row>
    </Container>;
  }
}

export default Spirits;
