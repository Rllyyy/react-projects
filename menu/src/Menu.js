import React from 'react'

const Menu = ({data}) => {
  return (
    <div className="menuGrid">
      {data.map((menuItem)=>{
        const {id, title, img, desc, price} = menuItem;
        return <article key={id} className="menuItem">
          <img src={img} alt={title} className="menuItemPicture"/>
          <div className="menuItemInfo">
            <div className="menuItemNamePriceContainer">
              <h3 className="name">{title}</h3>
              <span className="price">{price}€</span>
            </div>
            <div className="lightUnderline"></div>
            <p className="menuItemText">{desc}</p>
          </div>
        </article>
      })}
    </div>
  );
}

export default Menu;
