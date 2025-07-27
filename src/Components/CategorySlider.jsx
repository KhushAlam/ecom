import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { getmaincategory } from "./../Redux/ActionCreator/MainctegoryActionCreator"
import { getsubcategory } from "./../Redux/ActionCreator/SubctegoryActionCreator"
import { getbrand } from "./../Redux/ActionCreator/BrandActionCreator"

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function CategorySlider({ tittle }) {

  let maincategorystatedata = useSelector(state => state.maincategorystatedata);
  let subcategorystatedata = useSelector(state => state.subcategorystatedata);
  let brandstatedata = useSelector(state => state.brandstatedata);
  let [data, setdata] = useState([])
  let dispatch = useDispatch();

  let [swiperitem, setswiperitem] = useState(tittle === 'brand' ? 6 : 3);
  let Screenhandler = () => {
    if (window.innerWidth < 576) {
      setswiperitem(2);
    } else if (window.innerWidth < 768) {
      setswiperitem(3);
    } else if (window.innerWidth < 992) {
      setswiperitem(4);
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

  useEffect(() => {
    dispatch(getmaincategory())
  }, [maincategorystatedata.length])
  useEffect(() => {
    dispatch(getsubcategory())
  }, [subcategorystatedata.length])
  useEffect(() => {
    dispatch(getbrand())
  }, [brandstatedata.length])

  useEffect(() => {
    if (tittle === "maincategory" && maincategorystatedata !== 0) {
      setdata(maincategorystatedata.filter((x) => x.active))
    }
    if (tittle === "subcategory" && subcategorystatedata !== 0) {
      setdata(subcategorystatedata.filter((x) => x.active)
      )
    }
    if (tittle === "brand" && brandstatedata !== 0) {
      setdata(brandstatedata.filter((x) => x.active))
    }
  }, [tittle, maincategorystatedata, subcategorystatedata, brandstatedata])
  return (
    <>
      <section id="clients" className="clients section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{tittle.toUpperCase()}</h2>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            {...Option}
          >
            {data.map((item) => {
              return <SwiperSlide key={item.id}>
                <Link to={`/shop?${tittle === "maincategory" ? "mc" : (tittle === 'subcategory' ? "sc" : "br")}=${item.name}`}><img
                  src={`${process.env.REACT_APP_SITE_MAINCATEGORY}${item.pic}`}
                  className="img-fluid"
                  alt=""
                  style={tittle === 'brand' ? { height: 100 } : { height: 300 }}
                  width={300}
                /></Link>
              </SwiperSlide>
            })}
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </>
  );
}
