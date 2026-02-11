
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const addToCart = () => {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add product to cart
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        />
      </Link>

      {/* Product Name */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{product.name}</h3>
      </Link>

      {/* Price */}
      <p>${product.price}</p>

      {/* Add to Cart */}
      <button onClick={addToCart}>
        Add to Cart
      </button>

    </div>
  );
}
