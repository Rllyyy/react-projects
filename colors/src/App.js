import React, { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setLList] = useState([]);

  //events
  const handleInputColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <h2 id='heading'>Color Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={color} placeholder='#f15025' onChange={(e) => handleInputColorChange(e)} />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      <section className='selected-color'></section>
      <section className='colors'></section>
    </main>
  );
}

export default App;
