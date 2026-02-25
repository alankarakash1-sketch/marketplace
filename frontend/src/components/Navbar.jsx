import React, { useState } from "react";
import { Link } from "react-router-dom";

// Hardcoded products for the dropdown
const productsList = [
  { id: 1, name: "Bose QC45 Headphones" },
  { id: 2, name: "Sony WH-1000XM5" },
  { id: 3, name: "Sennheiser HD 660 S" },
  { id: 4, name: "Marshall Acton II Speaker" }
];

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        backgroundColor: "#1e1e1e",
        color: "#fff"
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
          Home
        </Link>

        <Link to="/cart" style={{ color: "#fff", marginRight: "15px" }}>
          Cart
        </Link>

        {/* Products dropdown */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span style={{ marginLeft: "10px" }}>Products ▼</span>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                color: "#333",
                minWidth: "200px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                borderRadius: "5px",
                zIndex: 10,
                marginTop: "5px",
                padding: "10px 0"
              }}
            >
              {productsList.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  style={{
                    display: "block",
                    padding: "8px 15px",
                    textDecoration: "none",
                    color: "#333"
                  }}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      {token ? (
        <button
          onClick={logout}
          style={{
            backgroundColor: "#ff4d4f",
            border: "none",
            padding: "6px 12px",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <Link to="/login" style={{ color: "#fff", marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#4dabf7" }}>
            Register
          </Link>
          <Link to="/policy" style={{ color: "#fff", marginRight: "15px" }}>
  Policy
</Link>
        </div>
      )}
    </nav>
  );
}
