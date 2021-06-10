import React, { useState, useEffect } from 'react';
import Values from 'values.js';
import SingleColor from './SingleColor.js';
import './App.css';

function App() {
  const [color, setColor] = useState('');
  const [submittedColor, setSubmittedColor] = useState('');
  const [pickedColor, setPickedColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [showClipboardModal, setShowClipboardModal] = useState(false);

  //useEffects
  //Display "Copy to Clipboard for 5 seconds"
  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowClipboardModal(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showClipboardModal]);

  //functions
  //get RGB of single color
  const setBackgroundOfPicked = (rgb) => {
    if (rgb === undefined) {
      return `rgb(0,0,155)`;
    }
    const rgbWithComma = rgb.join(',');
    return `rgb(${rgbWithComma})`;
  };

  //events
  const handleInputColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      let colorsNoBase = colors.filter((color) => color.type !== 'base');
      let colorBase = colors.filter((color) => color.type === 'base');
      setPickedColor(setBackgroundOfPicked(colorBase[0].rgb));
      setSubmittedColor(color);
      setError(false);
      setList(colorsNoBase);
    } catch (error) {
      setSubmittedColor(color);
      setError(true);
    }
  };

  return (
    <main>
      <h2 id='heading'>Color Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={color} placeholder='#f15025, red or rgb(x,x,x)' onChange={(e) => handleInputColorChange(e)} />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      {/* Only show selected color if there is no error and only show if the user has clicked on "submit" */}
      {error === true ? (
        <section className='error-text'>
          <p>Input is not valid</p>
        </section>
      ) : (
        submittedColor && (
          <section className='selected-color' style={{ backgroundColor: `${pickedColor}` }}>
            <p>Your Pick: {submittedColor}</p>
          </section>
        )
      )}
      {!error && (
        <section className='colors'>
          {list.map((color, index) => {
            return <SingleColor key={index} color={color} index={index} setShowClipboardModal={setShowClipboardModal} />;
          })}
        </section>
      )}
      {showClipboardModal && (
        <div className='modal-clipboard'>
          <p>Saved Color to Clipboard</p>
        </div>
      )}
    </main>
  );
}

export default App;
