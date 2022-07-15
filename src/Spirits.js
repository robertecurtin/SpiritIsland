import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

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
                height="140"
                image={spiritToImage(spirit.name)}
                alt= {spirit.name}
                              />
              <CardContent>
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
