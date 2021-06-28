function Home() {
  return (
    <main className='Home'>
      <h2>Home Content</h2>
      <section className='content'>
        <div className='item'>
          <div className='product-image'>
            <img
              src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000'
              alt='i-phone'
            />
          </div>

          <div className='info'>
            <p className='product-name'>I-Phone</p>
            <p className='product-price'>price</p>
            <button className='button-to-cart'>Add to Cart</button>
          </div>
        </div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>

        <div className='item'></div>
        <div className='item'>
          <div className='product-image'>
            <img src='https://media.nbb-cdn.de/images/products/640000/646513/samsung_note_9_hero_blau.jpg?size=2800' alt='i-phone' />
          </div>

          <div className='info'>
            <p className='product-name'>Galaxy Note 9</p>
            <p className='product-price'>price</p>
            <button className='button-to-cart'>Add to Cart</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
