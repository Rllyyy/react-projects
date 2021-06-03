import React, { useState, useEffect } from 'react';
import data from './data';
import { TiClipboard } from 'react-icons/ti';

function App() {
  const [count, setCount] = useState(1);
  const [textArray, setTextArray] = useState([]);
  const [selectedType, setSelectedType] = useState('paragraphs');
  const [copyText, setCopyText] = useState('Copy Text');
  const [showCopyText, setShowCopyText] = useState(false);

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

  /*   useEffect(() => {
    if (showCopyText) {
      setShowCopyText(true);
    } else {
      setShowCopyText(false);
    }
  }, [amount]);
 */
  //functions
  const randomNumber = () => {
    //Return random number between 0 and 105
    return Math.floor(Math.random() * (dataText.length - 1));
  };

  const clearOutputLorem = () => {
    setTextArray([]);
  };

  const getParagraphs = (amount, startingDataParagraph) => {
    let outputArray = [];
    let intNextParagraph = 0;

    while (outputArray.length < amount) {
      //check that the next element is not out of array bound
      if (intNextParagraph + startingDataParagraph < dataText.length - 1) {
        intNextParagraph++;
      } else {
        intNextParagraph = 0;
        startingDataParagraph = 0;
      }
      outputArray.push(dataText[startingDataParagraph + intNextParagraph]);
    }

    setTextArray(outputArray);

    //setTextArray(dataText.slice(startingDataParagraph, amount + startingDataParagraph));
  };

  //Functions get called when user selects "Sentences" and clicks Generate
  const getSentences = (amount, startingDataParagraph) => {
    //The following code is a complete mess but idc. This is just for training react
    let startParagraph = dataText[startingDataParagraph];
    let outputArray = [];

    //split paragraph into one array of sentences
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

    //Set the UseState value and only add the dot to the output if the sentences is not 0
    setTextArray([outputArray.length > 0 ? `${outputArray.join('.')}.` : '']);
  };

  //Functions get called when user selects "Words" and clicks Generate
  const getWords = (amount, startingDataParagraph) => {
    //When I wrote this, only god and I knew how it worked. Now, only god knows!
    let startParagraph = dataText[startingDataParagraph];
    let outputArray = [];

    //split paragraph into one array of words
    let paragraphToArray = startParagraph.split(' ');

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

      //split new paragraph into one array of words
      const newParagraphArray = newParagraph.split(' ');

      //Add elements from the array to the old array
      try {
        for (let i = 0; i < newParagraphArray.length; i++) {
          if (paragraphToArray.length < amount) {
            paragraphToArray.push(newParagraphArray[i]);
          }
        }
      } catch {}
    }

    for (let i = 0; i < amount; i++) {
      if (i < paragraphToArray.length) {
        outputArray.push(paragraphToArray[i]);
      }
    }

    //Remove Punctuation
    const outputArrayPunctuation = outputArray.join(' ');
    const outputArrayNoPunctuation = outputArrayPunctuation.split('.').join('').split(',').join('');

    //Set the UseState value
    setTextArray([outputArrayNoPunctuation]);
  };

  //handle Copy Button Click
  const handleCopyButtonClick = () => {
    setCopyText('Saved Text');
    navigator.clipboard.writeText(textArray.join(' '));
  };

  //handle change
  const handleChangeSelect = (e) => {
    clearOutputLorem();
    setSelectedType(e.target.value);
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
        getWords(amount, startingDataParagraph);
        break;
      case 'characters':
        break;
      default:
        break;
    }

    //Only show
    if (amount > 0) {
      setShowCopyText(true);
    } else {
      setShowCopyText(false);
    }
  };

  //JSX
  return (
    <>
      <main>
        <h2>Lorem Ipsum Generator</h2>
        <form className='lorem-form' onSubmit={handleSubmit}>
          <input type='number' name='amount' id='amount' value={count} onChange={(e) => setCount(e.target.value)} />
          <select id='type' name='type' value={selectedType} onChange={(e) => handleChangeSelect(e)}>
            <option value='paragraphs'>Paragraphs</option>
            <option value='sentences'>Sentences</option>
            <option value='words'>Words</option>
          </select>
          <button className='btn' type='submit'>
            Generate
          </button>
        </form>
        {/* Only show Button if there is text displayed */}
        {showCopyText ? (
          <button className='btn' id='btn-copy' onClick={() => handleCopyButtonClick()}>
            <TiClipboard />
            <span>{copyText}</span>
          </button>
        ) : (
          ''
        )}
        {textArray.map((item, index) => {
          return (
            <article className='lorem' key={index}>
              <p>{item}</p>
            </article>
          );
        })}
      </main>
    </>
  );
}

export default App;
