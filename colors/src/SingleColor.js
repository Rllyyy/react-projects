import React, { useState } from 'react';
import rgbToHex from './utils.js';

const SingleColor = ({ color, index }) => {
  const { rgb, weight } = color;
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const rgbWithComma = rgb.join(',');

  //copy color to clipboard
  const copyColorToClipboard = () => {};

  return (
    <article className='single-color' style={{ backgroundColor: `rgb(${rgbWithComma})`, color: 'black' }}>
      <div className='container-weight-color'>
        <p className={`label-weight ${index > 9 ? 'color-light-fadeout' : 'color-dark-fadeout'}`}>
          {index <= 9 && '-'}
          {weight}%{' '}
        </p>
        <p className={`label-color ${index > 9 ? 'color-light' : 'color-dark'}`}>{color.hexString()}</p>
        <p>rgb({rgbWithComma})</p>
      </div>
    </article>
  );
};

export default SingleColor;
