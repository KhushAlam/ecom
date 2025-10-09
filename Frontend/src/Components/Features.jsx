import React from "react";

export default function Features() {
  return (
    <>
      <section id="features" className="features section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>
            Our Advanced Features
            <br />
          </p>
        </div>

        <div className="container">
          <div className="row gy-5">
            <div className="col-xl-6" data-aos="zoom-out" data-aos-delay="100">
              <img src="assets/img/features.png" className="img-fluid" alt="" />
            </div>

            <div className="col-xl-6 d-flex">
              <div className="row align-self-center gy-4">
                <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Wide Product Selection</h3>
                  </div>
                </div>

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Secure Online/Ofline Payments</h3>
                  </div>
                </div>

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Fast & Reliable Delivery</h3>
                  </div>
                </div>

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Easy Returns & Refunds</h3>
                  </div>
                </div>

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="600">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Real-Time Order Tracking</h3>
                  </div>
                </div>

                <div className="col-md-6" data-aos="fade-up" data-aos-delay="700">
                  <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>24/7 Customer Support</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="alt-features" className="alt-features section">
        <div className="container">
          <div className="row gy-5">
            <div
              className="col-xl-7 d-flex order-2 order-xl-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row align-self-center gy-5">
                <div className="col-md-6 icon-box">
                  <i className="bi bi-award"></i>
                  <div>
                    <h4>Smart Product Recommendations</h4>
                    <p>
                      AI-powered suggestions based on your browsing history and preferences for a personalized experience.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box">
                  <i className="bi bi-card-checklist"></i>
                  <div>
                    <h4>Cart & Wishlist Management</h4>
                    <p>
                      Save your favorite items, manage your cart easily, and buy when the time is right.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box">
                  <i className="bi bi-dribbble"></i>
                  <div>
                    <h4>Admin Product Dashboard</h4>
                    <p>
                      Seamlessly add, edit, or remove products, manage orders, and track sales insights in real time.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box">
                  <i className="bi bi-filter-circle"></i>
                  <div>
                    <h4>Responsive & Mobile-Friendly UI</h4>
                    <p>
                      Smooth and intuitive user experience across devices – from desktops to smartphones.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box">
                  <i className="bi bi-lightning-charge"></i>
                  <div>
                    <h4>Discounts, Coupons & Offers</h4>
                    <p>
                      Easily apply promo codes and view available discounts before checkout.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box">
                  <i className="bi bi-patch-check"></i>
                  <div>
                    <h4>Secure User Authentication</h4>
                    <p>
                      Protected login system using JWT & role-based access for both users and admins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-5 d-flex align-items-center order-1 order-xl-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src="assets/img/alt-features.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
