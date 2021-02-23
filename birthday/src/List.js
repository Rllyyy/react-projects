import React from 'react';
import "./List.css";

const List = ({people}) => {
    return (
        <React.Fragment>
            {people.map((person)=> {
                const {id, name, age, image} = person;
                return(
                    <div key={id} className="personContainer">
                        <img className="personPic" src={image} alt={name}/>
                        <span className="info">
                            <span className="personName">{name}</span>
                            <span className="personAge">{age} years</span>
                        </span>
                    </div>
                );
            })}
        </React.Fragment>
    )
}

export default List;
