import React, { useState } from 'react';
import { IoIosCopy } from 'react-icons/io';
import rgbToHex from './utils.js';

const SingleColor = ({ color, index, setShowClipboardModal }) => {
  const { rgb, weight } = color;
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const rgbWithComma = rgb.join(',');

  //copy color to clipboard
  const copyColorToClipboard = () => {
    setShowClipboardModal(true);
    navigator.clipboard.writeText(color.hexString());
  };

  return (
    <article className='single-color' style={{ backgroundColor: `rgb(${rgbWithComma})`, color: 'black' }}>
      <div className='container-weight-color'>
        <p className={`label-weight ${index > 9 ? 'color-light-fadeout' : 'color-dark-fadeout'}`}>
          {index <= 9 && '-'}
          {weight}%{' '}
        </p>
        <p className={`label-color ${index > 9 ? 'color-light' : 'color-dark'}`}>{color.hexString()}</p>
        <div className='icon'>
          <IoIosCopy className='icon-dark' onClick={() => copyColorToClipboard()} />
        </div>
        {/* <p>rgb({rgbWithComma})</p> */}
      </div>
    </article>
  );
};

export default SingleColor;
