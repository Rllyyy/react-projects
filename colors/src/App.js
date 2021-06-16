import React, { useEffect, useRef, useReducer } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor.js";
import "./App.css";

function App() {
  //Reducer
  //reducer function
  const reducer = (state, action) => {
    if (action.type === "ADD_COLOR") {
      return {
        ...state,
        submittedColor: action.payload.submittedColor,
        pickedColor: action.payload.pickedColor,
        error: action.payload.error,
        list: action.payload.list,
      };
    }
    if (action.type === "SHOW_CLIPBOARD_MODAL") {
      return {
        ...state,
        showClipboardModal: true,
      };
    }
    if (action.type === "HIDE_CLIPBOARD_MODAL") {
      return {
        ...state,
        showClipboardModal: false,
      };
    }
    throw new Error("No matching action type");
  };

  //initial reducer state
  const defaultState = {
    submittedColor: "",
    pickedColor: "",
    error: false,
    list: new Values("rgb(0, 199, 221)").all(10),
    showClipboardModal: false,
  };

  //useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  //UseRef
  //uncontrolled input
  const inputRef = useRef(null);

  //useEffects
  //Display "Copy to Clipboard for 5 seconds"
  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch({ type: "HIDE_CLIPBOARD_MODAL" });
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.showClipboardModal]);

  //Functions
  //get RGB of single color
  const getBackgroundOfPicked = (rgb) => {
    if (rgb === undefined) {
      return `rgb(0,0,155)`;
    }
    const rgbWithComma = rgb.join(",");
    return `rgb(${rgbWithComma})`;
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //default
    let pickedColor = "";
    const submittedColor = inputRef.current.value;
    let error = false;
    let list = "";

    try {
      const colors = new Values(inputRef.current.value).all(10);
      const colorsNoBase = colors.filter((color) => color.type !== "base");
      const colorBase = colors.filter((color) => color.type === "base");

      pickedColor = getBackgroundOfPicked(colorBase[0].rgb);
      list = colorsNoBase;
    } catch {
      error = true;
    }
    //payload
    dispatch({ type: "ADD_COLOR", payload: { pickedColor: pickedColor, submittedColor: submittedColor, error: error, list: list } });
  };

  const showModal = () => {
    dispatch({ type: "SHOW_CLIPBOARD_MODAL" });
  };

  return (
    <main>
      <h2 id='heading'>Color Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={inputRef} placeholder='#f15025, red or rgb(x,x,x)' />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      {/* Only show selected color if there is no error and only show if the user has clicked on "submit" */}
      {state.error === true ? (
        <section className='error-text'>
          <p>Input is not valid</p>
        </section>
      ) : (
        state.submittedColor && (
          <section className='selected-color' style={{ backgroundColor: `${state.pickedColor}` }}>
            <p>Your Pick: {state.submittedColor}</p>
          </section>
        )
      )}
      {!state.error && (
        <section className='colors'>
          {state.list.map((color, index) => {
            return <SingleColor key={index} color={color} index={index} showModal={showModal} />;
          })}
        </section>
      )}
      {state.showClipboardModal && (
        <div className='modal-clipboard'>
          <p>Saved Color to Clipboard</p>
        </div>
      )}
    </main>
  );
}

export default App;
