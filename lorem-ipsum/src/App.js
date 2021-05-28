import React,{useState} from 'react';
import data from "./data";
import { TiClipboard } from "react-icons/ti";

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [showCopy, setShowCopy] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    let amount = parseInt(count);
    if (amount < 0){
      amount = amount * (-1);
      setCount(amount);
    }

    if (amount > data.length){
      amount = data.length;
      setCount(amount);
    }
    setText(data.slice(0,amount));
    if (amount > 0){
      setShowCopy(true);
    } else {
      setShowCopy(false);
    }
  }

  return (
    <main>
      <h2>Generate Lorem Ipsum</h2>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <input type="number" name="amount" id="amount" value={count} onChange={(e) => setCount(e.target.value)}/>
        <select id="type">
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="characters">Characters</option>
        </select>
        <button className="btn" type="submit">Generate</button>
      </form>
      {showCopy ? <button className="btn" id="btn-copy"><TiClipboard/>
      <span>Copy Text</span></button> : ""}
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
  );
}

export default App;
