import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const addToCart = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
  };

  return (
    <div className="product-card">

      {/* Clickable area */}
      <Link to={`/product/${product.id}`} className="product-link">

        <img
          src={product.image}
          alt={product.name}
        />

        <h3>{product.name}</h3>

      </Link>

      <p>${product.price} / day</p>

      <button onClick={addToCart}>
        Add to Cart
      </button>

    </div>
  );
}
