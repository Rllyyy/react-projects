import React, {useState} from 'react';
import "./tours.css";

const Tours = ({name, info, image, price, removeTourProp, id}) => {
    const [readMore, setReadMore] = useState(false);

    return (
        <React.Fragment>
            <div className="card">
                <img src={image} alt=""/>
                <div className="CountryPrice">
                    <span className="Country">{name}</span>
                    <span className="Price">€{price}</span>
                </div>
                <p className="Info">
                    {readMore ? info : `${info.substring(0,299)}... `}
                    <button className="MoreLess" onClick={() => setReadMore(!readMore)}>{readMore ? `show less` : `read more`}</button>
                </p>
                <button className="btn" onClick={() => removeTourProp(id)}>Not Interested</button>
            </div>
        </React.Fragment>
    );
}

export default Tours
