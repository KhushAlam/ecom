import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { gettestimonial } from "./../Redux/ActionCreator/TestimonialActionCreator";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/effect-coverflow';
import "swiper/css/pagination";
import { useDispatch, useSelector } from 'react-redux';

export default function Testomonial() {
  const testimonialstatedata = useSelector((state) => state.testimonialstatedata);
  const dispatch = useDispatch();

  const [swiperitem, setswiperitem] = useState(3);

  const Screenhandler = () => {
    if (window.innerWidth < 576) {
      setswiperitem(1);
    } else if (window.innerWidth < 992) {
      setswiperitem(2);
    } else {
      setswiperitem(3);
    }
  };

  useEffect(() => {
    dispatch(gettestimonial());
  }, []); // fetch only once on mount

  useEffect(() => {
    Screenhandler(); // set initial slides
    window.addEventListener("resize", Screenhandler);
    return () => {
      window.removeEventListener("resize", Screenhandler);
    };
  }, []);

  const Option = {
    effect: 'coverflow',
    slidesPerView: swiperitem,
    spaceBetween: 50,
    freeMode: true,
    loop: true,
    pagination: {
      clickable: true,
    },
    modules: [EffectCoverflow, Pagination],
    className: "mySwiper"
  };

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>What they are saying about us<br /></p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          key={testimonialstatedata.length} // Important to re-create Swiper
          {...Option}
        >
          {testimonialstatedata
            .filter((x) => x.active)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial-item">
                  <div className="stars">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                  </div>
                  <p className="slider-message">{item.message}</p>
                  <div className="profile mt-auto">
                    <img
                      src={`${process.env.REACT_APP_SITE_SUBCATEGORY}${item.pic}`}
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>{item.name}</h3>
                    <h4>Ceo &amp; Founder</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
