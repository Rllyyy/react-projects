import React from 'react';
import "./tours.css";
//fetch Data

const tour = () => {
    return (
        <React.Fragment>
            <div className="card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/1280px-Stonehenge2007_07_30.jpg" alt=""/>
                
                <div className="CountryPrice">
                    <span className="Country">Best of Country Days Tour</span>
                    <span className="Price">$X,XXX</span>
                </div>
                <p className="Info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum, dignissimos accusamus quisquam impedit similique. 
                Eius, modi doloribus ea ipsam magnam odit fugiat, at quo quos cupiditate nisi possimus mollitia?</p>
                <button className="btn">Not Interested</button>
            </div>
            
        </React.Fragment>
    );
}

export default tour
