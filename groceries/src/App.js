import React, { useState, useReducer, useRef } from "react";
import Alert from "./Alert";
import List from "./List";

function App() {
  //useState
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: "Hello", type: "" });

  //useRef
  const inputRef = useRef(null);
  //inputRef.current.value

  //functions
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) {
      //TODO display alert
    } else if (inputRef.current.value && isEditing) {
      //TODO deal with edit
    } else if (inputRef.current.value) {
      //TODO show alert
      const newItem = { id: new Date().getTime().toString(), title: inputRef.current.value };
      setList([...list, newItem]);
    }
  };

  return (
    <main className='App'>
      <h2>Grocery List</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' className='input-grocery' ref={inputRef} placeholder='apple' />
        <button className='button-add' type='submit'>
          {isEditing ? "Edit" : "Add Item"}
        </button>
      </form>
      {list.length > 0 && (
        <section className='groceries'>
          <List items={list} />
          <button className='button-clear' onClick={() => setList([])}>
            Clear Items
          </button>
        </section>
      )}
      {alert.show && <Alert {...alert} />}
    </main>
  );
}

export default App;
