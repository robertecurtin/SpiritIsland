import React, { Component } from 'react';
import Spirits from './Spirits';
import Intro from './Intro';

class App extends Component {
  render () {
    return <div className='App'>
      <Intro />
      <Spirits />
    </div>;
  }
}

export default App;
