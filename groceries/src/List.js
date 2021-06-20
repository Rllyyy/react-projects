import React from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const List = ({ items, deleteItem, editItem }) => {
  return (
    <ul className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <li className='grocery-item' key={id}>
            <span className='grocery-title'>{title}</span>
            <div className='grocery-buttons'>
              <button className='button-edit' onClick={() => editItem(id)}>
                <MdModeEdit />
              </button>
              <button className='button-delete' onClick={() => deleteItem(id)}>
                <RiDeleteBinLine />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
