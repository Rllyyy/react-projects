import React from "react";
const Cookies = ({ acceptedCookieClick }) => {
  const leaveSite = () => {
    window.history.back();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    acceptedCookieClick();
  };
  return (
    <main className='cookies'>
      <form className='cookie-form' onSubmit={handleSubmit}>
        <h2 className='heading'>Cookies</h2>
        <p className='text'>
          This site uses cookies to store key values. These values include items submitted to the grocery list and information if the user has accepted cookies from this site
          before. Cookies are vital for this website to work.
        </p>
        <div className='button-container'>
          <button className='cookie-accept-button' type='submit'>
            Accept Cookies
          </button>
          <button className='leave-site-button' type='button' onClick={() => leaveSite()}>
            Leave Site
          </button>
        </div>
      </form>
    </main>
  );
};

export default Cookies;
