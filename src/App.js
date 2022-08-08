import React from 'react';
import Spirits from './Spirits';
import Intro from './Intro';

function App() {
  const [sortType, setSortType] = React.useState('Offense-');
  const [complexityFilters, setComplexityFilters] = React.useState({});

  return <div className='App'>
    <Intro
      sortType={sortType}
      setSortType={setSortType}
      complexityFilters={complexityFilters}
      setComplexityFilters={setComplexityFilters}
      />
    <Spirits sortType={sortType}/>
  </div>;
}

export default App;
