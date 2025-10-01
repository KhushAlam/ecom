import React, { useEffect, useState } from 'react'
import Breadcrum from "../Components/Breadcrum";
import { getmaincategory } from "../Redux/ActionCreator/MainctegoryActionCreator";
import { getsubcategory } from "../Redux/ActionCreator/SubctegoryActionCreator";
import { getbrand } from "../Redux/ActionCreator/BrandActionCreator";
import { getproduct } from "../Redux/ActionCreator/ProductActionCreator";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom'; // ⬅️ removed useParams here

export default function ShopPage() {
  let [data, setdata] = useState([]);
  let [flag, setflag] = useState(true);
  let [search, setsearch] = useState("");
  let [min, setmin] = useState(0);
  let [max, setmax] = useState(50000);

  let [mc, setmc] = useState('');
  let [sc, setsc] = useState('');
  let [br, setbr] = useState('');

  // ✅ useSearchParams returns [searchParams, setSearchParams]
  let [searchParams] = useSearchParams();

  let maincategorystatedata = useSelector(state => state.maincategorystatedata);
  let subcategorystatedata = useSelector(state => state.subcategorystatedata);
  let brandstatedata = useSelector(state => state.brandstatedata);
  let productstatedata = useSelector(state => state.productstatedata);

  let dispatch = useDispatch();

  // Function for filter product

  function softfilter(option) {
    if (option === '1') {
      setdata(data.sort((x, y) => y.id.localeCompare(x.id)))
    }
    else if (option === '2') {
      setdata(data.sort((x, y) => x.finalPrice - y.finalPrice))
    }
    else {
      setdata(data.sort((x, y) => y.finalPrice - x.finalPrice))
    }
    setflag(!flag);
  }

  function postSearch(e) {
    e.preventDefault();
    search = search.toLowerCase()
    setdata(
      productstatedata.filter((x) =>
        x.active && (
          x?.name?.toLowerCase()?.includes(search) ||
          x?.maincategory?.toLowerCase() === search ||
          x?.subcategory?.toLowerCase() === search ||
          x?.brand?.toLowerCase() === search ||
          x?.color?.toLowerCase() === search ||
          x?.description?.toLowerCase().includes(search)
        )
      )
    );
  }


  function priceFilter(e) {
    e.preventDefault()
    filterProduct(mc, sc, br, min, max)
  }


  function filterProduct(mc, sc, br ,min=0,max=50000 ) {
    setdata(productstatedata.filter((x) =>
      x.active &&
      (mc === "All" || mc === x.maincategory) &&
      (sc === "All" || sc === x.subcategory) &&
      (br === "All" || br === x.brand) &&
      (x === -1 || (x.finalPrice >= min && x.finalPrice <= max))
    ))
  }






  useEffect(() => {
    dispatch(getmaincategory())
  }, [])

  useEffect(() => {
    dispatch(getsubcategory())
  }, [])

  useEffect(() => {
    dispatch(getbrand())
  }, [])

  useEffect(() => {

    setsearch('')
    // ✅ Now searchParams is URLSearchParams object
    let mcValue = searchParams.get("mc") ?? "All";
    let scValue = searchParams.get("sc") ?? "All";
    let brValue = searchParams.get("br") ?? "All";
    dispatch(getproduct())
    if (productstatedata) {
      setmc(mcValue);
      setsc(scValue);
      setbr(brValue);
      filterProduct(mcValue, scValue, brValue)
    }
  }, []);

  return (
    <>
      <Breadcrum title="Shop Page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <ul className="list-group mt-5 mb-3">
              <li className="list-group-item active" aria-current="true">Maincategory</li>
              <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item">All</Link>
              {
                maincategorystatedata.filter((x) => x.active).map((item) => {
                  return (
                    <Link key={item._id} to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} className="list-group-item">
                      {item.name}
                    </Link>
                  )
                })
              }
            </ul>

            <ul className="list-group mt-5 mb-3">
              <li className="list-group-item active" aria-current="true">Subcategory</li>
              <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item">All</Link>
              {
                subcategorystatedata.filter((x) => x.active).map((item) => {
                  return (
                    <Link key={item._id} to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} className="list-group-item">
                      {item.name}
                    </Link>
                  )
                })
              }
            </ul>

            <ul className="list-group mt-5 mb-3">
              <li className="list-group-item active" aria-current="true">Brand</li>
              <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item">All</Link>
              {
                brandstatedata.filter((x) => x.active).map((item) => {
                  return (
                    <Link key={item._id} to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} className="list-group-item">
                      {item.name}
                    </Link>
                  )
                })
              }
            </ul>
            <h4 className="col-md-3 btn btn-primary w-100">Price Filter</h4>
            <div className="col-md-2">
              <form onSubmit={priceFilter}>
                <div className="btn-group w-100">
                  <input type="range" name="min" className='btn btn-primary' value={min}
                    onInput={(e) => parseInt(e.target.value) < max ? setmin(e.target.value) : null}
                    min={0} max={50000} step={500} /><span>{min}</span>
                </div>
                <div className="btn-group w-100">
                  <input type='range' name='max' className='btn btn-primary' value={max}
                    onInput={(e) => parseInt(e.target.value) > min ? setmax(e.target.value) : null}
                    min={0} max={50000} step={500}
                  /><span>{max}</span>
                </div>
                <button type="submit" className='btn btn-primary'>Apply filter</button>
              </form>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-9 mb-3">
                <form onSubmit={postSearch}>
                  <div className='btn-group w-100'>
                    <input type='search' value={search} name='search' onChange={(e) => setsearch(e.target.value)} placeholder='Search Product by Name,Maincategory,Brand,Color etc,' className='form-control mt-3 border-3 border-primary'></input>
                    <button type="submit" className='btn btn-primary mt-3'>Search</button>
                  </div>
                </form>
              </div>
              <div className="col-md-3 mb-3">
                <select onChange={(e) => { softfilter(e.target.value) }} className='form-select mt-3 p-2 border-2 border-primary'>
                  <option value="1">Latest </option>
                  <option value="2">Price : Low to High</option>
                  <option value="3">Price : High to Low</option>
                </select>
              </div></div>
            <section id="team" className='team section'>
              <div className="row">
                {data.map((item) => {
                  return (
                    <div key={item._id} className='col-lg-3 col-md-4 col-sm-6'>
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
                            <h4 style={{ height: 50 }}>{item.name}</h4>
                            <span>{item.stock ? `${item.stockQuantity} Left in Stock` : `Out of Stock`}</span>
                            <p>
                              <del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.disCount}% Off</sup>
                            </p>
                            <div className="">
                              <Link to={`/product/${item._id}`} className="w-100 btn btn-primary">
                                <i className="fa fa-shopping-cart"></i> Add to cart
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
