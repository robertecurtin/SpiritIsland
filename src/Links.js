import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const PadRemainingSpace = <Col fluid={true} />;

const config = [
  "https://bost.ocks.org/mike/algorithms/",
  "https://ncase.me/trust/",
  "https://catonmat.net/low-level-bit-hacks",
  "https://betterexplained.com/articles/understanding-quakes-fast-inverse-square-root/",
  "https://www.moserware.com/2009/09/stick-figure-guide-to-advanced.html",
  "https://hackaday.com/2017/04/01/ask-hackaday-which-balaclava-is-best-for-hacking/",
  "http://www.jezzamon.com/fourier/index.html",
  "https://victorzhou.com/blog/intro-to-random-forests/",
  "http://www.r2d3.us/visual-intro-to-machine-learning-part-1/",
  "https://www.reddit.com/r/softwaregore/comments/9xvf5u/this_is_fine/",
  "https://gist.github.com/rxaviers/7360908",
  "https://github.com/kdeldycke/awesome-falsehood",
  "https://www.shamusyoung.com/twentysidedtale/?p=2940",
  "https://mtlynch.io/code-review-love/",
  "https://www.wired.co.uk/article/corporate-memphis-design-tech",
  "https://quickparty.games/",
  "https://www.nature.com/articles/d41586-021-01822-1",
  "https://github.com/hannahcode/word-guessing-game",
  "https://github.com/Droogans/unmaintainable-code"
];

function Links() {
  return <div className='Game'>
    <Container>
      <Row>
        {config.map((url) => {
          return <Col width='300px' key={`row-containing-${url}`}>
            <LinkPreview url={url} width='300px' />
          </Col>;
        })}
        {PadRemainingSpace}
      </Row>
    </Container>
  </div>;
}

export default Links;
