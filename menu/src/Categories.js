import React from 'react'

const Categories = ({categories, filterItems}) => {
  return (
    <div className="buttonContainer">
      {categories.map((category, index)=> {
        return(
          <button type="button" key={index} onClick={()=>filterItems(category)}>{category}</button>
        );
      })}
    </div>
  )
}

export default Categories
