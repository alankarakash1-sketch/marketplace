import React, { useEffect, useState } from "react";

export default function Cart() {

  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Add days if missing
    const updatedCart = storedCart.map(item => ({
      ...item,
      days: item.days || 1
    }));

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  }, []);

  // Update days
  const updateDays = (id, days) => {

    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, days: Number(days) }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove
  const removeFromCart = (id) => {

    const updatedCart =
      cart.filter(item => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Total price
  const getTotal = () => {

    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.days,
      0
    );
  };

  if (cart.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="container" style={{ marginTop: "30px" }}>

      <h1>Your Cart</h1>

      {cart.map(item => (

        <div
          key={item.id}
          className="cart-item"
        >

          {/* Left */}
          <div>

            <h3>{item.name}</h3>

            <p>₹{item.price} / day</p>

            {/* Days */}
            <label>
              Days:
              <input
                type="number"
                min="1"
                value={item.days}
                onChange={(e) =>
                  updateDays(
                    item.id,
                    e.target.value
                  )
                }
              />
            </label>

            {/* Item Total */}
            <p className="item-total">
              Item Total: ₹
              {item.price * item.days}
            </p>

          </div>

          {/* Remove */}
          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="remove-btn"
          >
            Remove
          </button>

        </div>
      ))}

      {/* Grand Total */}
      <h2 className="grand-total">
        Total: ₹{getTotal()}
      </h2>

    </div>
  );
}
