import React from "react";

function App() {
  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className='App'>
      <h2>Grocery List</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' className='input-grocery' placeholder='apple' />
        <button className='button-submit' type='submit'>
          Add Item
        </button>
      </form>
      <section className='grocery-list'>
        <div className='items'>Test</div>
        <button className='button-clear'>Clear Items</button>
      </section>
    </main>
  );
}

export default App;
