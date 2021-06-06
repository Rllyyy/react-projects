import React, { useState } from 'react';
import rgbToHex from './utils.js';

const SingleColor = ({ rgb, weight, index }) => {
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const rgbWithComma = rgb.join(',');
  return (
    <article className='single-color' style={{ backgroundColor: `rgb(${rgbWithComma})` }}>
      <p>{weight}%</p>
    </article>
  );
};

export default SingleColor;
