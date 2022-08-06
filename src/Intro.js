import React from 'react';
import { Alert } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap';

const PadRemainingSpace = <Col />;

function Intro() {
  return <Alert variant='primary'>

    <Container>
      <Row>
        {PadRemainingSpace}
        <Col>
          Spirits!
        </Col>
        {PadRemainingSpace}
      </Row>
    </Container>
  </Alert>;
}

export default Intro;
