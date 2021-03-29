import React from 'react'

const Menu = ({data}) => {
  return (
    <div className="menuGrind">
      {data.map((menuItem)=>{
        const {id, title, img, desc} = menuItem;
        return <article key={id} className="menuItem">
          <img src={img} alt={title} className="menuItemPicture"/>
        </article>
      })}
    </div>
  )
}

export default Menu
