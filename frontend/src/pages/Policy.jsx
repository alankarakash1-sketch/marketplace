import React from "react";

export default function Policy() {
  return (
    <div className="container policy-page">

      <h1>Rental Policy</h1>

      <section>
        <h3>1. Rental Duration</h3>
        <p>
          All products are rented on a per-day basis.
          The minimum rental period is 1 day.
        </p>
      </section>

      <section>
        <h3>2. Payment Policy</h3>
        <p>
          Full payment must be completed before
          the product is delivered.
        </p>
      </section>

      <section>
        <h3>3. Cancellation & Refund</h3>
        <p>
          Cancellations before delivery are eligible
          for a partial refund. After delivery,
          no refund is provided.
        </p>
      </section>

      <section>
        <h3>4. Product Responsibility</h3>
        <p>
          Customers are responsible for any damage
          or loss during the rental period.
        </p>
      </section>

      <section>
        <h3>5. Late Return</h3>
        <p>
          Late returns will be charged extra
          per day based on product price.
        </p>
      </section>

      <section>
        <h3>6. Support</h3>
        <p>
          For support, contact:
          support@audiomarketplace.com
        </p>
      </section>

    </div>
  );
}