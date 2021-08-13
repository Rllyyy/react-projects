import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const cartData = useContext(CartContext);
  return (
    <main className='cart'>
      <h2>Cart Content</h2>
      <section className='cart-table'>
        <div className='cart-table-heading'>
          <span className='cart-table-heading-item'>Item</span>
          <span className='cart-table-heading-item-description'></span>
          <span className='cart-table-heading-price'>Price</span>
          <span className='cart-table-heading-quality'>Quantity</span>
          <span className='cart-table-heading-subtotal'>Subtotal</span>
        </div>
        <div className='cart-items'>
          {cartData.state.cartList.map((cartItem) => {
            //destructure cartItem
            const { id, manufacturer, imageURL, price, product, quantity } = cartItem;
            return (
              <div className='cart-item' key={id}>
                <div className='item-picture-wrapper'>
                  <img className='item-picture' src={imageURL} alt={product} />
                </div>
                <div className='item-description'>
                  <h3 className='item-name'>{product}</h3>
                  <p className='item-manufacturer'>{manufacturer}</p>
                </div>
                <p className='item-price'>{price}€</p>
                {/* //TODO: Make this input */}
                <p className='item-quantity'>{quantity}</p>
                {/* //TODO: price * quantity */}
                <p className='item-subtotal'>{price}€</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Cart;
