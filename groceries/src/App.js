import React, { useState, useReducer, useRef, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";
import Cookies from "./Cookies";

//Local Storage
const getLocalStorageGroceries = () => {
  let list = localStorage.getItem("groceriesListCookie");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const getLocalStorageCookieAccepted = () => {
  let acceptedCookie = localStorage.getItem("groceries-accepted-cookies");
  if (acceptedCookie) {
    return true;
  }
  return false;
};

function App() {
  //useState
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [userAcceptedCookies, setUserAcceptedCookies] = useState(getLocalStorageCookieAccepted());
  const [list, setList] = useState(getLocalStorageGroceries());

  //UseRef
  const inputRef = useRef(null);

  //UseEffect
  //focus input
  useEffect(() => {
    try {
      inputRef.current.focus();
    } catch {}
  }, []);

  //show alert for 6500 ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false });
    }, 6500);
    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  //update local storage
  useEffect(() => {
    localStorage.setItem("groceriesListCookie", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    if (userAcceptedCookies) {
      console.log(getLocalStorageGroceries(userAcceptedCookies));
    }
    // setList();
    // console.log("hello");
  }, [userAcceptedCookies]);

  //functions
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlert({ show: true, msg: "Removed Item from List", type: "item_removed" });
  };

  const clearList = () => {
    setList([]);
    setAlert({ show: true, msg: "Cleared List", type: "list_cleared" });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    inputRef.current.value = specificItem.title;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) {
      setAlert({ show: true, msg: "Please enter a Value", type: "error" });
    } else if (inputRef.current.value && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: inputRef.current.value };
          }
          return item;
        })
      );
      inputRef.current.value = "";
      setEditID(null);
      setIsEditing(false);
      setAlert({ show: true, msg: "Value was Updated", type: "update" });
    } else if (inputRef.current.value) {
      const newItem = { id: new Date().getTime().toString(), title: inputRef.current.value };
      setList([...list, newItem]);
      inputRef.current.value = "";
      setAlert({ show: true, msg: "Added Item to List", type: "success" });
    }
  };

  if (!userAcceptedCookies) {
    return <Cookies setUserAcceptedCookies={setUserAcceptedCookies} />;
  }
  return (
    <>
      {alert.show && <Alert {...alert} setAlert={setAlert} />}
      <main className='App'>
        <h2>Grocery List</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' className='input-grocery' ref={inputRef} placeholder='apple' />
          <button className='button-add' type='submit'>
            {isEditing ? "Update" : "Add Item"}
          </button>
        </form>
        {list.length > 0 && (
          <section className='groceries'>
            <List items={list} deleteItem={deleteItem} editItem={editItem} />
            <button className='button-clear' onClick={() => clearList()}>
              Clear all Items
            </button>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
