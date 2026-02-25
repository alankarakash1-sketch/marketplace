import React, { useEffect, useState } from "react";

export default function Payment() {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(false);

  // Format INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(price);
  };

  // Load cart
  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

    const sum = storedCart.reduce(
      (acc, item) =>
        acc + item.price * (item.days || 1),
      0
    );

    setTotal(sum);

  }, []);

  // Fake Payment
  const handlePayment = (e) => {

    e.preventDefault();

    // Simulate success
    setTimeout(() => {

      localStorage.removeItem("cart");

      setSuccess(true);

    }, 1500);
  };

  if (success) {
    return (
      <div className="container payment-success">

        <h1>Payment Successful ✅</h1>

        <p>Thank you for your order!</p>

        <p>
          Amount Paid: {formatPrice(total)}
        </p>

      </div>
    );
  }

  return (
    <div className="container payment-page">

      <h1>Payment</h1>

      <h3>
        Total: {formatPrice(total)}
      </h3>

      <form onSubmit={handlePayment}>

        <label>
          Full Name
          <input type="text" required />
        </label>

        <label>
          Email
          <input type="email" required />
        </label>

        <label>
          Card Number
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>

        <div className="payment-row">

          <label>
            Expiry
            <input
              type="text"
              placeholder="MM/YY"
              required
            />
          </label>

          <label>
            CVV
            <input
              type="password"
              placeholder="***"
              required
            />
          </label>

        </div>

        <button type="submit">
          Pay Now
        </button>

      </form>

    </div>
  );
}