import React, { useEffect } from "react";
import About from "../Components/About";
import Value from "../Components/Value";
import Facts from "../Components/Facts";
import Features from "../Components/Features";
import ProductSlider from "../Components/ProductSlider";
import Testomonial from "../Components/Testomonial";
import Products from "../Components/Products";
import CategorySlider from "../Components/CategorySlider";
import { Link } from "react-router-dom";
import banner2 from "../banners/banner2.jpg"
import banner3 from "../banners/banner3.jpg"
import banner4 from "../banners/banner2.jpg"
// import Breadcrum from "../Components/Breadcrum";

import { getmaincategory } from "./../Redux/ActionCreator/MainctegoryActionCreator"
import { getsubcategory } from "./../Redux/ActionCreator/SubctegoryActionCreator"
import { getproduct } from "./../Redux/ActionCreator/ProductActionCreator";
import { useDispatch, useSelector } from "react-redux";
export default function Homepage() {
  let dispatch = useDispatch();
  let maincategorystatedata = useSelector(state => state.maincategorystatedata)
  let subcategorystatedata = useSelector(state => state.subcategorystatedata);
  let productstatedata = useSelector(state => state.productstatedata);



  useEffect(() => {
    dispatch(getmaincategory())
  }, [maincategorystatedata])

  useEffect(() => {
    dispatch(getsubcategory())
  }, [subcategorystatedata])

  useEffect(() => {
    dispatch(getproduct())
  }, [productstatedata])

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">
                      We offer modern and top brands products for male
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                      We deal in Top 50+ brands and provide upto 90% descount on
                      top and latest brands
                    </p>
                    <div
                      className="d-flex flex-column flex-md-row"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <Link to="/shop?mc=Male" className="btn-get-started">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 order-1 order-lg-2 hero-img"
                    data-aos="zoom-out"
                  >
                    <img
                      src={banner4}
                      className="img-fluid animated"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="carousel-item">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up">
                      We offer modern and top brands products for female
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                      We deal in Top 50+ brands and provide upto 90% descount on
                      top and latest brands
                    </p>
                    <div
                      className="d-flex flex-column flex-md-row"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <Link to="/shop?mc=Female" className="btn-get-started">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 order-1 order-lg-2 hero-img"
                    data-aos="zoom-out"
                  >
                    <img
                      src={banner2}
                      className="img-fluid animated"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="carousel-item">
            <section id="hero" className="hero section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h1 data-aos="fade-up fs-5">
                      We offer modern and top brands products for kids
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                      We deal in Top 50+ brands and provide upto 90% descount on
                      top and latest brands
                    </p>
                    <div
                      className="d-flex flex-column flex-md-row"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <Link to="/shop?mc=Kids" className="btn-get-started">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 order-1 order-lg-2 hero-img"
                    data-aos="zoom-out"
                  >
                    <img
                      src={banner3}
                      className="img-fluid animated"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <CategorySlider tittle="maincategory" />
      <Products />
      <About />
      <Value />
      {
        maincategorystatedata.filter((x) => x.active).map((item) => {
          return <ProductSlider key={item.id} tittle={item.name} data={productstatedata.filter((x) => x.active && x.maincategory === item.name)} />
        })
      }
      <Facts />
      <CategorySlider tittle="subcategory" />
      <Features />
      <Testomonial />
      <CategorySlider tittle="brand" />
    </>
  );
}
