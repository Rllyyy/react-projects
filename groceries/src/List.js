import React from "react";

const List = ({ items }) => {
  return (
    <ul className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <li className='grocery-item' key={id}>
            <span className='grocery-title'>{title}</span>
            <div className='grocery-buttons'>
              <button className='button-edit'>Hello</button>
              <button className='button-delete'>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
