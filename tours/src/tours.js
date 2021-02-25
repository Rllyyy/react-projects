import React from 'react';
import "./tours.css";
//fetch Data

const Tours = ({name, info, image, price}) => {
    return (
        <React.Fragment>
            <div className="card">
                <img src={image} alt=""/>
                <div className="CountryPrice">
                    <span className="Country">{name}</span>
                    <span className="Price">€{price}</span>
                </div>
                <p className="Info">{info}</p>
                <button className="btn">Not Interested</button>
            </div>
            
        </React.Fragment>
    );
}

export default Tours
