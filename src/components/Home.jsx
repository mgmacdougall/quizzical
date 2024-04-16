import React from 'react';

function Home({handler}) {
  return (
    <div>
      <h1 className="text-center width-100">Home Page</h1>
      <button onClick={() => handler()}>Start Game</button>
    </div>
  );
}

export default Home;
