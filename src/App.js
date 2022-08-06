import React from 'react';
import Spirits from './Spirits';
import Intro from './Intro';

function App() {
  const [sortType, setSortType] = React.useState('Offense-');
  return <div className='App'>
    <Intro sortType={sortType} setSortType={setSortType}/>
    <Spirits sortType={sortType}/>
  </div>;
}

export default App;
