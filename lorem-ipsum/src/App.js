import React, {useState, useEffect} from 'react';
import data from "./data";
import { TiClipboard } from "react-icons/ti";

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [selectedType, setSelectedType] = useState("paragraphs");
  const [copyText, setCopyText] = useState("Copy Text");

  //globals
  let dataText = data;

  //useEffect
  useEffect(() => {
    let timeout = setTimeout(()=>{
      setCopyText("Copy Text");
    },5000)
    return () => {
      clearTimeout(timeout);
    }
  }, [copyText])


  //functions
  const randomNumber = () => {
    return Math.floor(Math.random() * dataText.length)
  }

  const handleCopyButtonClick = () =>{
    setCopyText("Saved Text");
    navigator.clipboard.writeText(text.join(" "));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let amount = parseInt(count);
    let startPosition = randomNumber();

    //Set negative values to positives
    if (amount < 0){
      amount = amount * (-1);
      setCount(amount);
    }

    //set max length to array size (106)
    if (amount > dataText.length){
      amount = data.length;
      setCount(amount);
    }

    //restart Array if not long enough
    if (amount +  startPosition > dataText.length){
      dataText = dataText.concat(dataText);
    }

    setText(dataText.slice(startPosition, amount + startPosition));
  }

  return (
    <>
    <main>
      <h2>Lorem Ipsum Generator</h2>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <input type="number" name="amount" id="amount" value={count} onChange={(e) => setCount(e.target.value)}/>
        <select id="type" name="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="characters">Characters</option>
        </select>
        <button className="btn" type="submit">Generate</button>
      </form>
      {text.length !== 0 ? <button className="btn" id="btn-copy" onClick={()=>handleCopyButtonClick()}><TiClipboard/>
      <span>{copyText}</span></button> : ""}
      {text.map((item, index)=>{
        return (
        <article className="lorem" key={index}>
          <p>
            {item}
          </p> 
        </article>
        );
      })}
    </main>
    </>
  );
}

export default App;
