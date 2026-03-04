import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] = useState([]);
  const [days, setDays] = useState(1);

  const [method, setMethod] = useState("UPI");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

  const [upi, setUpi] = useState("");

  const [status, setStatus] = useState("");

  const navigate = useNavigate();


  // Razorpay (Demo)
  const handleRazorpay = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    alert("Connecting to Razorpay...");

    setTimeout(() => {

      alert("❌ Payment Failed\nAny amount debited will be refunded");

      navigate("/");

    }, 2000);
  };


  // Check Login
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);

  }, [navigate]);


  // Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * days,
    0
  );


  // Remove
  const remove = (id) => {

    const updated = cart.filter(i => i.id !== id);

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };


  // Validation
  const validatePayment = () => {

    if (method === "Card") {

      if (
        card.number.length !== 16 ||
        card.cvv.length !== 3 ||
        !card.expiry
      ) {
        return false;
      }
    }

    if (method === "UPI") {

      if (!upi.includes("@")) {
        return false;
      }
    }

    return true;
  };


  // Pay (UPI / Card)
  const pay = () => {

    if (method === "Razorpay") {
      handleRazorpay();
      return;
    }

    if (!validatePayment()) {
      setStatus("fail");
      return;
    }

    setTimeout(() => {

      setStatus("success");

      localStorage.removeItem("cart");

    }, 1500);
  };


  // Success Page
  if (status === "success") {
    return (
      <div className="container" style={{ textAlign: "center" }}>

        <h1 style={{ color: "green" }}>✅ Payment Successful</h1>

        <p>Thank you for your order!</p>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>

      </div>
    );
  }


  // Fail Page
  if (status === "fail") {
    return (
      <div className="container" style={{ textAlign: "center" }}>

        <h1 style={{ color: "red" }}>❌ Payment Failed</h1>

        <p>Invalid {method} Details</p>

        <p>Try Again</p>

        <button onClick={() => setStatus("")}>
          Retry
        </button>

      </div>
    );
  }


  if (cart.length === 0) {
    return <p style={{ textAlign: "center" }}>Cart Empty</p>;
  }


  return (
    <div className="container">

      <h1>Checkout</h1>


      {/* Items */}
      {cart.map(item => (
        <div
          key={item.id}
          className="product-card"
          style={{ display: "flex", justifyContent: "space-between" }}
        >

          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}/day</p>
          </div>

          <button onClick={() => remove(item.id)}>
            Remove
          </button>

        </div>
      ))}


      {/* Days */}
      <div style={{ margin: "20px 0" }}>

        <label>Days: </label>

        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(+e.target.value)}
        />

      </div>


      {/* Method */}
      <h3>Payment Method</h3>

      <label>
        <input
          type="radio"
          value="UPI"
          checked={method === "UPI"}
          onChange={(e) => setMethod(e.target.value)}
        />
        UPI
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="Card"
          checked={method === "Card"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Card
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="Razorpay"
          checked={method === "Razorpay"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Razorpay
      </label>


      {/* Razorpay */}
      {method === "Razorpay" && (
        <div className="pay-box">

          <p>Pay securely with Razorpay</p>

          <button
            className="pay-btn"
            onClick={handleRazorpay}
          >
            Pay with Razorpay
          </button>

        </div>
      )}


      {/* UPI */}
      {method === "UPI" && (

        <div className="pay-box">

          <input
            type="text"
            placeholder="example@upi"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />

        </div>
      )}


      {/* Card */}
      {method === "Card" && (

        <div className="pay-box">

          <input
            type="text"
            placeholder="Card Number"
            maxLength="16"
            value={card.number}
            onChange={(e) =>
              setCard({ ...card, number: e.target.value })
            }
          />

          <input
            type="month"
            value={card.expiry}
            onChange={(e) =>
              setCard({ ...card, expiry: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="CVV"
            maxLength="3"
            value={card.cvv}
            onChange={(e) =>
              setCard({ ...card, cvv: e.target.value })
            }
          />

        </div>
      )}


      {/* Total */}
      <h2>Total: ₹{total}</h2>


      {/* Pay */}
      <button
        className="checkout-btn"
        onClick={pay}
      >
        Pay Now
      </button>

    </div>
  );
}