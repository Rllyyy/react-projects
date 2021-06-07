import React, { useState } from 'react';
import rgbToHex from './utils.js';

const SingleColor = ({ color }) => {
  const { rgb, weight } = color;
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const rgbWithComma = rgb.join(',');

  return (
    <article className='single-color' style={{ backgroundColor: `rgb(${rgbWithComma})` }}>
      <p>
        {weight}% {color.hexString()}
      </p>
    </article>
  );
};

export default SingleColor;
