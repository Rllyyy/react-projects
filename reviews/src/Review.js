import React, {useState} from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteRight} from "react-icons/fa";
import "./Review.css";

const Review = ({people}) => {
  const [index, setIndex] = useState(0);
  const {id, name, job, image, text} = people[index];

  const checkNumber = (number) => {
    if(number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  }

  const prevPerson = () => {
    setIndex(()=> {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    })
  }
  
  const nextPerson = () => {
    setIndex(()=> {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    })
  }
  
  const surpriseClickHandler = () =>{
    //Greenfoot.GetRandomNumber()
    let randomNumber = Math.floor(Math.random() * people.length);
    //Check if the last number is equal to the next one; if so repeat the function
    if (!NumbersEqual(randomNumber)) {
      setIndex(() => {
        return randomNumber;
      });
    } else {
      surpriseClickHandler();
    }
  }

  const NumbersEqual = (number) => {
    if (number === index) {
      return true
    } 
    return false;
  }
  return (
    <div className="reviewContainer">
      <div className="img-container">
        <img src={image} alt={`Picture of ${name}`}/>
        <div className="imageBackground"></div>
        <div className="quoteIcon"><FaQuoteRight /></div>
      </div>
      <div className="nameJobContainer">
        <p className="name">{name}</p>
        <p className="jobTitle">{job}</p>
      </div>
      <p className="text">{text}</p>
      <div className="buttonContainer">
        <button className="leftRightButton" onClick={prevPerson}><FaChevronLeft/></button>
        <button className="leftRightButton" onClick={nextPerson}><FaChevronRight/></button>
      </div>
      <button className="surpriseButton" onClick={surpriseClickHandler}>Surprise Me</button>
    </div>
  );
}

export default Review
