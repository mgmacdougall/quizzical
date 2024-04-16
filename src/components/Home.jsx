import React from 'react';

function Home({showView, handler}) {
  console.log('Here', showView);
  return (
    <div>
      <h1 className="text-center width-100">Home Page</h1>
      <div className={showView ? 'display' : 'hidden'}>
        <button onClick={() => handler()}>Start Game</button>
      </div>
    </div>
  );
}

export default Home;
