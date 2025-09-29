import React, { useEffect, useRef, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Form, Link, useNavigate } from "react-router-dom";
import Formvalidator from "../../../Validator/Formvalidator";
import Filesvalidator from "../../../Validator/Filesvalidator";
import { getproduct, Createproduct } from "../../../Redux/ActionCreator/ProductActionCreator";
import { getmaincategory } from "../../../Redux/ActionCreator/MainctegoryActionCreator";
import { getsubcategory } from "../../../Redux/ActionCreator/SubctegoryActionCreator";
import { getbrand } from "../../../Redux/ActionCreator/BrandActionCreator"
import { useDispatch, useSelector } from "react-redux";


var rte;
export default function AdmincreateProduct() {
  var refdiv = useRef(null);


  let navigate = useNavigate();
  let dispach = useDispatch();
  let maincategorystatedata = useSelector(state => state.maincategorystatedata);
  let subcategorystatedata = useSelector(state => state.subcategorystatedata);
  let brandstatedata = useSelector(state => state.brandstatedata);
  let [data, setdata] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    basePrice: "",
    disCount: 0,
    finalPrice: "",
    stock: true,
    stockQuantity: "",
    description: "",
    pic: [],
    active: true
  })
  let [errormassege, seterrormassege] = useState({
    name: "Name field is Mendatory",
    color: "Color feild is Mendatory",
    size: "Size feild is Mendatory",
    basePrice: "basePrice feild is Mendatory",
    disCount: "discount feild is Mendatory",
    stockQuantity: "Stockquantity feild is Mendatory",
    pic: "Pic is Mendetory"
  })

  let [show, setshow] = useState(false);

  function getinputdata(e) {
    var name = e.target.name
    var value = e.target.files && e.target.files.length ? Array.from(e.target.files).map(x => x) : e.target.value //For multipal files
    // var value = e.target.files && e.target.files.length ?  e.target.files[0] : e.target.value for real backend
    seterrormassege((old) => {
      return {
        ...old,
        [name]: e.target.files ? Filesvalidator(e) : Formvalidator(e)
      }
    })

    setdata((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === 1 ? true : false) : value
      }
    })
  }
  function postinputdata(e) {
    e.preventDefault()
    let bp = parseInt(data.basePrice);
    let d = parseInt(data.disCount);
    let fp = parseInt(bp - bp * d / 100);
    let stockQuantity = parseInt(data.stockQuantity);


    let error = Object.values(errormassege).find(x => x !== "")
    if (error) {
      setshow(true)
    }
    else {
      const newdata = {
        ...data,
        basePrice: bp,
        disCount: d,
        finalPrice: fp,
        stockQuantity: stockQuantity,
        maincategory: data.maincategory ? data.maincategory : maincategorystatedata[0].name,
        subcategory: data.subcategory ? data.subcategory : subcategorystatedata[0].name,
        brand: data.brand ? data.brand : brandstatedata[0].name,
        discription: rte.getHTMLCode()
      }

      const Fromdata = new FormData()
      Object.keys(newdata).forEach(key =>
        Fromdata.append(key, newdata[key])
      )
      dispach(Createproduct(Fromdata))

      // for real backend

      //   let fromdata=new FormData()
      // fromdata.append("name",data.name);
      // fromdata.append("pic",data.pic);
      // fromdata.append("active",data.active)
      // dispach(Createproduct(fromdata))
      navigate("/admin/product");
    }
  }
  useEffect(() => {
    dispach(getmaincategory())
  }, [])

  useEffect(() => {
    dispach(getsubcategory())
  }, [])
  useEffect(() => {
    dispach(getbrand())
  }, [])

  useEffect(() => {
    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
  }, [])

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="text-center p-2 bg-primary w-100 text-light">
              Product
              <Link to="/admin/product">
                <i className="fa fa-long-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postinputdata}>
              <div className="mb-3">
                <label>Name*</label>
                <input type="text" name="name" onChange={getinputdata} placeholder="please enter your name" className={`form-control border-3 border-primary ${show && errormassege.name ? "border-danger" : "border-primary"}`} />
                {show && errormassege.name ? <p className="text-danger">{errormassege.name}</p> : null}
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">

                  <label>Maincategory*</label>
                  <select name="maincategory" onChange={getinputdata} className="form-select border-3 border-primary" >
                    {
                      maincategorystatedata.filter(x => x.active).map((item) => {
                        return <option key={item.id} value={item.name}>{item.name}</option>
                      })
                    }
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Subcategory*</label>
                  <select className="form-select border-3 border-primary" onChange={getinputdata} name="subcategory">
                    {
                      subcategorystatedata.filter(x => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                      })
                    }
                  </select></div>
                <div className="col-md-3 mb-3">
                  <label>Brand*</label>
                  <select className="form-select border-3 border-primary" onChange={getinputdata} name="brand">
                    {
                      brandstatedata.filter(x => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                      })
                    }
                  </select>

                </div>
                <div className="col-md-3 mb-3">
                  <label>Stock*</label>
                  <select className="form-select border-3 border-primary" onChange={getinputdata}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" onChange={getinputdata} placeholder="Product Base Price" className={`form-control border-3 border-primary ${show && errormassege.basePrice ? "border-danger" : "border-primary"}`} />
                  {show && errormassege.basePrice ? <p className="text-danger">{errormassege.basePrice}</p> : null}

                </div>
                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="disCount" onChange={getinputdata} value={data.disCount} placeholder="Product Discount" className={`form-control border-3 border-primary ${show && errormassege.disCount ? "border-danger" : "border-primary"}`} />
                  {show && errormassege.disCount ? <p className="text-danger">{errormassege.disCount}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color*</label>
                  <input type="text" name="color" onChange={getinputdata} placeholder="Product color" className={`form-control border-3 border-primary ${show && errormassege.color ? "border-danger" : "border-primary"}`} />
                  {show && errormassege.color ? <p className="text-danger">{errormassege.color}</p> : null}

                </div>
                <div className="col-md-6 mb-3">
                  <label>Product Size*</label>
                  <input type="number" name="size" onChange={getinputdata} placeholder="Product-size" className={`form-control border-3 border-primary ${show && errormassege.size ? "border-danger" : "border-primary"}`} />
                  {show && errormassege.size ? <p className="text-danger">{errormassege.size}</p> : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>Discription</label>
                  <div className="col-md-12  form-control border-3 border-primary">
                    <textarea rows={3} ref={refdiv} name="description" placeholder="Product Discription"></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Stock Quentity*</label>
                  <input type="number" name="stockQuantity" onChange={getinputdata} placeholder="Stock Quantity" className={`form-control border-3 border-primary ${show && errormassege.stockQuantity ? "border-danger" : "border-primary"}`} />
                  {show && errormassege.stockQuantity ? <p className="text-danger">{errormassege.stockQuantity}</p> : null}
                </div>
                <div className="col-md-4 mb-3">
                  <label>Pic*</label>
                  <input type="file" multiple name="pic" onChange={getinputdata} className={`form-control border-3 border-primary ${show && errormassege.pic ? 'border-danger' : 'border-primary'}`} />
                  {show && errormassege.pic ? (<p className="text-danger">{errormassege.pic}</p>) : null}
                </div>
                <div className="col-md-4 mb-3">
                  <label>Active*</label>
                  <select name="active" onChange={getinputdata} className="form-select border-primary border-3">
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary text-light text-center w-100">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
