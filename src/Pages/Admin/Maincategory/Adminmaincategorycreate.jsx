import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Form, Link, useNavigate } from "react-router-dom";
import Formvalidator from "../../../Validator/Formvalidator";
import Filesvalidator from "../../../Validator/Filesvalidator";
import { getmaincategory, Createmaincategory } from "../../../Redux/ActionCreator/MainctegoryActionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function Adminmaincategorycreate() {
  let navigate = useNavigate();
  let dispach = useDispatch();
  let maincategorystatedata = useSelector(state => state.maincategorystatedata);
  let [data, setdata] = useState({
    name: "",
    pic: "",
    active: true
  })
  let [errormassege, seterrormassege] = useState({
    name: "Name field is Mendatory",
    pic: "Pic is Mendetory"
  })

  let [show, setshow] = useState(false);

  function getinputdata(e) {
    var name = e.target.name
    var value = e.target.files && e.target.files.length ? "maincategory/" + e.target.files[0].name : e.target.value
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
    let error = Object.values(errormassege).find(x => x !== "")
    if (error) {
      setshow(true)
    }
    else {
      let item = maincategorystatedata.find(x => x.name.toLowerCase() === data.name.toLowerCase())
      if (item) {
        setshow(true)
        seterrormassege((old) => {
          return {
            ...old,
            'name': 'Same Name in Maincategory is Already exits!'
          }
        })
        return
      }
      dispach(Createmaincategory({...data}))

      // for real backend
      
    //   let fromdata=new FormData()
    // fromdata.append("name",data.name);
    // fromdata.append("pic",data.pic);
    // fromdata.append("active",data.active)
    // dispach(Createmaincategory(fromdata))
      navigate("/admin/maincategory");
    }
  }
  useEffect(() => {
    dispach(getmaincategory())
    
  })

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
              Maincategory
              <Link to="/admin/maincategory">
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
                <div className="col-md-6 mb-3">

                  <label>Pic*</label>
                  <input type="file" name="pic" onChange={getinputdata} className={`form-control border-3 border-primary ${show && errormassege.pic ? 'border-danger' : 'border-primary'}`} />
                  {show && errormassege.pic ? (<p className="text-danger">{errormassege.pic}</p>) : null}
                </div>
                <div className="col-md-6 mb-3">
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
