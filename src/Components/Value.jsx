import React from "react";

export default function Value() {
  return (
    <>
      <section id="values" className="values section">
  <div className="container section-title" data-aos="fade-up">
    <h2>Our Values</h2>
    <p>
      The core principles that drive everything we do at Apna Bazar
    </p>
  </div>

  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
        <div className="card">
          <img src="assets/img/values-1.png" className="img-fluid" alt="" />
          <h3>Customer First</h3>
          <p>
            We believe in delivering the best shopping experience to our customers. 
            Your trust and satisfaction are our top priority.
          </p>
        </div>
      </div>

      <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
        <div className="card">
          <img src="assets/img/values-2.png" className="img-fluid" alt="" />
          <h3>Empowering Local Sellers</h3>
          <p>
            Apna Bazar supports small and local businesses by bringing them online. 
            We help them grow while keeping prices fair for everyone.
          </p>
        </div>
      </div>

      <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
        <div className="card">
          <img src="assets/img/values-3.png" className="img-fluid" alt="" />
          <h3>Honesty & Transparency</h3>
          <p>
            From pricing to product quality, we believe in being open and honest. 
            No hidden charges, no fake promises — just genuine service.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
}
