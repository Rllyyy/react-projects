import React, { useReducer, useRef, useEffect } from "react";

//Components
import Alert from "./Alert";
import List from "./List";
import Cookies from "./Cookies";

//Reducer
import { reducer, init } from "./Reducer";

function App() {
  //UseReducer
  const [state, dispatch] = useReducer(reducer, init);

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
      dispatch({ type: "REMOVE_ALERT" });
    }, 6500);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.list]);

  //update local storage
  useEffect(() => {
    if (state.userAcceptedCookies) {
      localStorage.setItem("groceriesListCookie", JSON.stringify(state.list));
    }
  }, [state.list, state.userAcceptedCookies]);

  useEffect(() => {
    if (state.userAcceptedCookies) {
      localStorage.setItem("groceries-accepted-cookies", true);
    }
  }, [state.userAcceptedCookies]);

  //functions
  const deleteItem = (id) => {
    dispatch({ type: "SET_LIST", payload: state.list.filter((item) => item.id !== id) });
    dispatch({ type: "ALERT", payload: { show: true, msg: "Removed Item", type: "item_removed" } });
  };

  const clearList = () => {
    dispatch({ type: "SET_LIST", payload: [] });
    dispatch({ type: "ALERT", payload: { show: true, msg: "Cleared List", type: "list_cleared" } });
  };

  const editItem = (id) => {
    const specificItem = state.list.find((item) => item.id === id);
    dispatch({ type: "EDIT_ITEM", payload: { id: id } });
    inputRef.current.value = specificItem.title;
  };

  const editItems = () => {
    let editedList = state.list.map((item) => {
      if (item.id === state.editID) {
        return { ...item, title: inputRef.current.value };
      }
      return item;
    });
    dispatch({ type: "SET_LIST", payload: editedList });
  };

  const acceptedCookieClick = () => {
    dispatch({ type: "ACCEPTED_COOKIES" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) {
      dispatch({ type: "ALERT", payload: { show: true, msg: "Please enter a Value", type: "error" } });
    } else if (inputRef.current.value && state.isEditing) {
      editItems();
      inputRef.current.value = "";
      dispatch({ type: "RESET_EDIT_ITEM" });
      dispatch({ type: "ALERT", payload: { show: true, msg: "Updated Item", type: "update" } });
    } else if (inputRef.current.value) {
      const newItem = { id: new Date().getTime().toString(), title: inputRef.current.value };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      inputRef.current.value = "";
      dispatch({ type: "ALERT", payload: { show: true, msg: "Added Item", type: "success" } });
    }
  };

  if (!state.userAcceptedCookies) {
    return <Cookies acceptedCookieClick={acceptedCookieClick} />;
  }
  return (
    <>
      {state.alert.show && <Alert {...state.alert} />}
      <main className='App'>
        <h2>Grocery List</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' className='input-grocery' ref={inputRef} placeholder={state.list.length < 1 ? "apple" : ""} />
          <button className='button-add' type='submit'>
            {state.isEditing ? "Update" : "Add Item"}
          </button>
        </form>
        {state.list.length > 0 && (
          <section className='groceries'>
            <List items={state.list} deleteItem={deleteItem} editItem={editItem} />
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
