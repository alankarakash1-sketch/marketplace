import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Calculate total
    const sum = storedCart.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedCart.reduce((acc, item) => acc + item.price, 0));
  };

  if (cart.length === 0) return <p style={{ textAlign: "center", marginTop: "50px" }}>Your cart is empty</p>;

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="product-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: "#ff4d4f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Remove</button>
        </div>
      ))}
      <h2>Total: ${total}</h2>
    </div>
  );
}
