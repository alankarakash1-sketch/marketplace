import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products"; // ✅ Import central products

export default function Product() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found
      </p>
    );
  }

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="product-card product-page">

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "300px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        />

        <h1>{product.name}</h1>

        <p style={{ fontSize: "20px" }}>
          ${product.price}
        </p>

        <p style={{ color: "#666" }}>
          {product.description}
        </p>

        <button>Add to Cart</button>

      </div>
    </div>
  );
}
