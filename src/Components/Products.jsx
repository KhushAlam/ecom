import React, { useEffect, useState } from "react";
import { getmaincategory } from "../Redux/ActionCreator/MainctegoryActionCreator";
import { getproduct } from "../Redux/ActionCreator/ProductActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  let [selectedcategory, setselectedcategory] = useState("")
  let productstatedata = useSelector(state => state.productstatedata);
  let maincategorystatedata = useSelector(state => state.maincategorystatedata);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproduct());
  }, [productstatedata.length])

  useEffect(() => {
    dispatch(getmaincategory());
  }, [maincategorystatedata.length])
  return (
    <>
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <p>Check Our Latest Product</p>
        </div>

        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <ul
              className="portfolio-filters isotope-filters"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li onClick={() => { setselectedcategory("") }}>
                All
              </li>
              {
                maincategorystatedata.filter((x) => x.active).map((item) => {
                  return <li data-filter={`.filter-${item.name}`} onClick={() => { setselectedcategory(item.name) }} key={item.id}>{item.name}</li>
                })
              }
            </ul>

            <div
              className="row gy-4 isotope-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {
                productstatedata.filter((x) => x.active && (selectedcategory === '' || selectedcategory === x.maincategory)).map((item) => {
                  return <div key={item.id} className={`col-lg-4 col-md-6 portfolio-item `}>
                    <div className="portfolio-content h-100">
                      <img src={`${process.env.REACT_APP_SITE_MAINCATEGORY}${item.pic[0]}`} style={{ height: 250, width: "100%" }} className="img-fluid" alt="" />
                      <div className="portfolio-info h-10">
                        <h4>{item.maincategory}</h4>
                        <h4 className="float-end">{item.stock?`${item.stockQuantity} Left in Stock`:`Out of Stock`}</h4>
                        <p  style={{
                          position:"absolute",
                          bottom:60,
                        }}><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.disCount}% Off</sup></p>
                        <p 
                        style={{
                          position:"absolute",
                          left:10,
                          bottom:30,
                        }}>{item.name}</p>
                      </div> 
                 <div style={{
                        position:"absolute",
                        left:0,
                        bottom:0,
                        width:"100%",
                        zIndex:10
                      }}>
                       <Link to={`/product/${item.id}`}  className="btn btn-primary w-100"><i className="fa fa-shopping text-white">Add to Cart</i></Link>
                 </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
