import React, { useState, useEffect } from 'react';
import data from './data';
import { TiClipboard } from 'react-icons/ti';

function App() {
  const [count, setCount] = useState(1);
  const [textString, setTextString] = useState('');
  const [textArray, setTextArray] = useState([]);
  const [selectedType, setSelectedType] = useState('paragraphs');
  const [copyText, setCopyText] = useState('Copy Text');

  //globals
  let dataText = data;

  //useEffect
  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopyText('Copy Text');
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copyText]);

  //functions
  const randomNumber = () => {
    //Return random number between 0 and 105
    return Math.floor(Math.random() * (dataText.length - 1));
  };

  const handleCopyButtonClick = () => {
    setCopyText('Saved Text');
    navigator.clipboard.writeText(textArray.join(' '));
  };

  const getParagraphs = (amount, startingDataParagraph) => {
    //set max length to array size (106)
    if (amount > dataText.length) {
      amount = data.length;
      setCount(amount);
    }

    //restart Array if not long enough
    if (amount + startingDataParagraph > dataText.length) {
      dataText = dataText.concat(dataText);
    }

    setTextArray(dataText.slice(startingDataParagraph, amount + startingDataParagraph));
  };

  const getSentences = (amount, startingDataParagraph) => {
    //The following code is a complete mess but idc. This is just for training react
    let startParagraph = dataText[startingDataParagraph];
    let outputArray = [];

    //split paragraph into one array
    let paragraphToArray = startParagraph.split('.');

    //Remove the last element of the array as it is empty
    paragraphToArray.pop();

    let intNextParagraph = 0;

    while (paragraphToArray.length < amount) {
      //check that the next element is not out of array bound
      if (intNextParagraph + startingDataParagraph < dataText.length - 1) {
        intNextParagraph++;
      } else {
        intNextParagraph = 0;
        startingDataParagraph = 0;
      }
      //get the next paragraph
      const newParagraph = dataText[startingDataParagraph + intNextParagraph];
      if (newParagraph === undefined) break;

      //split new paragraph into one array
      const newParagraphArray = newParagraph.split('.');
      //Remove last element as it's empty
      newParagraphArray.pop();

      //Add elements from the array to the old array
      try {
        for (let i = 0; i < newParagraphArray.length; i++) {
          if (paragraphToArray.length < amount) {
            paragraphToArray.push(newParagraphArray[i]);
          }
        }
      } catch {}
    }

    //Push elements to the output array
    for (let i = 0; i < amount; i++) {
      if (i < paragraphToArray.length) {
        outputArray.push(paragraphToArray[i]);
      }
    }

    //convert Array to outputString
    let outputString = outputArray.join('.');

    //Only add the dot to the output if the sentences is not 0
    setTextString(outputString.length > 0 ? `${outputString}.` : '');
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    let startingDataParagraph = randomNumber();

    //Set negative values to positives
    if (amount < 0) {
      amount = amount * -1;
      setCount(amount);
    }

    switch (selectedType) {
      case 'paragraphs':
        getParagraphs(amount, startingDataParagraph);
        break;
      case 'sentences':
        getSentences(amount, startingDataParagraph);
        break;
      case 'words':
        break;
      case 'characters':
        break;
      default:
        break;
    }
  };

  //JSX
  return (
    <>
      <main>
        <h2>Lorem Ipsum Generator</h2>
        <form className='lorem-form' onSubmit={handleSubmit}>
          <input type='number' name='amount' id='amount' value={count} onChange={(e) => setCount(e.target.value)} />
          <select id='type' name='type' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value='paragraphs'>Paragraphs</option>
            <option value='sentences'>Sentences</option>
            <option value='words'>Words</option>
            <option value='characters'>Characters</option>
          </select>
          <button className='btn' type='submit'>
            Generate
          </button>
        </form>
        {textArray.length !== 0 ? (
          <button className='btn' id='btn-copy' onClick={() => handleCopyButtonClick()}>
            <TiClipboard />
            <span>{copyText}</span>
          </button>
        ) : (
          ''
        )}
        {selectedType === 'paragraphs' ? (
          textArray.map((item, index) => {
            return (
              <article className='lorem' key={index}>
                <p>{item}</p>
              </article>
            );
          })
        ) : (
          <article className='lorem'>
            <p>{textString}</p>
          </article>
        )}
      </main>
    </>
  );
}

export default App;
