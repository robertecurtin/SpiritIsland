import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Card } from '@mui/material';

const spirits = require('./config/spirits.json');

const PadRemainingSpace = <Col fluid={true} />;

const sortByOffenseAscending = (a, b) => {
  return b.summary[0] - a.summary[0]
};

function Spirits() {
  const sortedSpirits = spirits.sort(sortByOffenseAscending)

  return <div className='Game'>
    <Container>
      <Row>
        {sortedSpirits.map((spirit) => {
          return <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
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

export default Links;
