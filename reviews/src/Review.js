import React from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteRight} from "react-icons/fa";
import "./Review.css";

const Review = ({id, name, image, job, text}) => {
  const buttonOnClickHandler = (e) =>{
    e.preventDefault();
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
        <button className="leftRightButton"><FaChevronLeft/></button>
        <button className="leftRightButton"><FaChevronRight/></button>
      </div>
      <button className="surpriseButton" onClick={(e) => buttonOnClickHandler(e)}>Surprise Me</button>
    </div>
  );
}

export default Review
