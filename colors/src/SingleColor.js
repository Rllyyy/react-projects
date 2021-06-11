import React from 'react';
import { IoIosCopy } from 'react-icons/io';

const SingleColor = ({ color, index, setShowClipboardModal }) => {
  const { rgb, weight } = color;
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
        <div className='icon' onClick={() => copyColorToClipboard()}>
          <IoIosCopy className={index > 9 ? 'icon-light' : 'icon-dark'} />
        </div>
        {/* <p>rgb({rgbWithComma})</p> */}
      </div>
    </article>
  );
};

export default SingleColor;
