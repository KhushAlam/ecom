import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">

            <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <div className="content">
                <h3>About Us – Apna Bazar</h3>
                <h2>
                  Our vision is to connect local sellers with customers digitally, and make online shopping easy for everyone — from cities to villages.
                </h2>
                <p>Welcome to Apna Bazar, your trusted local e-commerce destination. We are committed to providing quality products at affordable prices, with a fast, reliable, and secure shopping experience across India.
                </p>
                <div className="text-center text-lg-start">
                  <Link to="/shop" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>Shop Now</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
              <img src="assets/img/about.jpg" className="img-fluid" alt="" />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
