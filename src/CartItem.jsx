
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const [message, setMessage] = useState(""); // Estado para el mensaje

  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + Number(item.cost.substring(1)) * item.quantity, 0);
  };

const handleCheckout = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón
    setMessage("Próximamente, en construcción!!!!!"); // Actualizar el mensaje
    setTimeout(() => {
      setMessage(""); // Ocultar el mensaje después de 3 segundos
    }, 3000); // Cambia 3000 a la duración que prefieras
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return Number(item.cost.substring(1)) * item.quantity;
  };



  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Plantas Diferentes : {cart.length}</h2>
      <h2 style={{ color: 'black' }}>Monto Total Carrito: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continuar comprando</button>
        <br />
        <div>
      <button className="get-started-button1" onClick={handleCheckout}>
        Pagar
      </button>
      {/* Mostrar el mensaje solo si existe */}
      {message && <p className="message">{message}</p>}
    </div>
      </div>
    </div>
  );
};

export default CartItem;


