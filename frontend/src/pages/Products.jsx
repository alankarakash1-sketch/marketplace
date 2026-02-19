import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";

export default function Product() {

  const { id } = useParams();

  const product = products.find(
    p => p.id === Number(id)
  );

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="container product-page">

      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="price">₹{product.price}</p>

        <p>{product.description}</p>

        <button onClick={addToCart}>
          Add To Cart
        </button>
      </div>

    </div>
  );
}
