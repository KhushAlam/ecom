import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function ProductSlider({ tittle, data }) {
  let [swiperitem, setswiperitem] = useState(4);
  let Screenhandler = () => {
    if (window.innerWidth < 576) {
      setswiperitem(1);
    }
    else {
      setswiperitem(3);
    }
  };
  let Option = {
    slidesPerView: swiperitem,
    spaceBetween: 50,
    freeMode: true,
    loop: true,
    pagination: {
      clickable: true,
    },
    modules: [FreeMode, Pagination],
    className: "mySwiper"
  }
  window.addEventListener("resize", Screenhandler);
  return (
    <>
      <section id="team" className="team section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{tittle.toUpperCase()}</h2>
          <p>Checkout Our Latest Product</p>
        </div>

        <div className="container">
          <div className=" gy-4">
            <Swiper {...Option}>
              {
                data.map((item) => {
                  return <SwiperSlide style={{ height: 650 }} key={item.id}>
                    <div
                      className="d-flex align-items-stretch"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div className="team-member">
                        <div className="member-img">
                          <img
                            src={`${item.pic[0]}`}
                            className="img-fluid"
                            style={{ height: 300 }}
                            alt=""
                          />

                        </div>
                        <div className="member-info">
                          <h4 style={{height:50}}>{item.name}</h4>
                          <span>{item.stock ? `${item.stockQuantity} Left in Stock` : `Out of Stock`}</span>
                          <p>
                            <del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.disCount}% Off</sup>
                          </p>
                          <div className="">
                            <Link to={`/product/${item.id}`} className="w-100 btn btn-primary"><i className="fa fa-shopping-cart"></i> Add to cart</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
