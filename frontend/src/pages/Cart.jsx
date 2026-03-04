import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] = useState([]);
  const [days, setDays] = useState(1);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Forms
  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Status
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  // Total
  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * days,
      0
    );
  };


  // Remove
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };


  // Validate before fake pay
  const validatePayment = () => {

    if (paymentMethod === "UPI") {
      if (!upiId.includes("@")) {
        alert("Enter valid UPI ID");
        return false;
      }
    }

    if (paymentMethod === "Card") {
      if (
        cardNumber.length !== 16 ||
        expiry.length !== 5 ||
        cvv.length !== 3
      ) {
        alert("Enter valid card details");
        return false;
      }
    }

    return true;
  };


  // Fake payment
  const confirmPayment = () => {

    if (!validatePayment()) return;

    setLoading(true);

    // Fake processing
    setTimeout(() => {

      setLoading(false);
      setPaymentFailed(true);

      localStorage.removeItem("cart");
      setCart([]);

    }, 2000);
  };


  // Home
  const goHome = () => {
    navigate("/");
  };


  // FAILED SCREEN
  if (paymentFailed) {
    return (
      <div className="container" style={{ textAlign: "center", marginTop: "80px" }}>

        <h1 style={{ color: "red" }}>❌ Payment Failed</h1>

        <p style={{ fontSize: "18px" }}>
          Your payment via <b>{paymentMethod}</b> was unsuccessful.
        </p>

        <p>Amount (₹{getTotal()}) will be refunded.</p>

        <button className="checkout-btn" onClick={goHome}>
          Go to Home
        </button>

      </div>
    );
  }


  if (cart.length === 0) {
    return <p style={{ textAlign: "center" }}>Cart is empty</p>;
  }


  return (
    <div className="container">

      <h1>Your Cart</h1>


      {/* Items */}
      {cart.map(item => (
        <div key={item.id} className="product-card"
          style={{ display: "flex", justifyContent: "space-between" }}>

          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}/day</p>
          </div>

          <button onClick={() => removeItem(item.id)}
            style={{
              background: "#ff4d4f",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "5px"
            }}>
            Remove
          </button>

        </div>
      ))}


      {/* Days */}
      <div style={{ margin: "20px 0" }}>
        <label>Rent Days: </label>

        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </div>


      {/* Method */}
      <div style={{ margin: "20px 0" }}>

        <h3>Payment Method</h3>

        <label>
          <input type="radio" value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)} />
          UPI
        </label>

        <br />

        <label>
          <input type="radio" value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)} />
          Card
        </label>

        <br />

        <label>
          <input type="radio" value="Cash"
            checked={paymentMethod === "Cash"}
            onChange={(e) => setPaymentMethod(e.target.value)} />
          Pay After Return
        </label>

      </div>


      {/* UPI FORM */}
      {paymentMethod === "UPI" && (
        <div className="payment-box">

          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

        </div>
      )}


      {/* CARD FORM */}
      {paymentMethod === "Card" && (
        <div className="payment-box">

          <input
            type="text"
            placeholder="Card Number"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          />

          <input
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

          <input
            type="password"
            placeholder="CVV"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          />

        </div>
      )}


      {/* CASH */}
      {paymentMethod === "Cash" && (
        <div className="payment-box">
          Pay after returning product.
        </div>
      )}


      {/* Total */}
      <h2>Total: ₹{getTotal()}</h2>


      {/* Button */}
      <button
        className="checkout-btn"
        onClick={confirmPayment}
        disabled={loading}
      >

        {loading ? "Processing..." : "Confirm Payment"}

      </button>

    </div>
  );
}