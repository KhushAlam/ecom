import React, { useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom';
export default function LoginPage() {
  let navigate = useNavigate();
  let [data, setdata] = useState({
    username: "",
    password: "",
    cpassword: ""
  });
  let [errormassege, seterrormassege] = useState("");
  function getiputdata(e) {
    let { name, value } = e.target;
    setdata((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postinputdata(e) {
    e.preventDefault();

    let response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    response = await response.json();
    
      alert(response.message);
      
    if(!response||!response.data){
      seterrormassege("User Id Or Password Invalid")
      return 
    }
    let item = response.data;
    if (item && item.active === "fa") {
      seterrormassege("Your Account is Blocked. Contact us for unBlock");
      return;
    } else if (item) {
      localStorage.setItem("login", true);
      localStorage.setItem("name", item.name);
      localStorage.setItem("userid", item._id);
      localStorage.setItem("role", item.role);
      localStorage.setItem("token", response.token);

      if (item.role === "Buyer") {
        navigate("/profile");
      } else if (item.role === undefined) {
        navigate("/*");
      } else {
        navigate("/admin");
      }
    } else {
      seterrormassege("Something went Wrong");
    }
  }


  return (
    <>
      <Breadcrum title="Login - Login To Your Account" />
      <div className="container-fluid my-2">
        <div className="row">
          <form onSubmit={postinputdata}>
            <div className="col-lg-7 col-md-8 col-sm-10 m-auto">
              <h5 className='bg-primary text-light text-center p-1'>Login To Your Account</h5>
              <div className="row">
                <div className=" mb-3">
                  <input type="text" name="username" onChange={getiputdata} placeholder='Enter UserName' className={`border-3 form-control ${errormassege ? "border-danger" : "border-primary"}`} />
                  {/* {errormassege ? <p className='text-danger'>{errormassege}</p> : null} */}
                </div>
                <div className=" mb-3">
                  <input type="password" name="password" onChange={getiputdata} placeholder='Enter password' className={`border-3 form-control ${errormassege ? "border-danger" : "border-primary"}`} />
                  {errormassege ? <p className='text-danger'>{errormassege}</p> : null}
                </div>
              </div>
              <div className=" mb-3"><button type="submit" className='form control border-3 btn btn-primary w-100'>Login</button></div>
              <div className='mb-3 d-flex justify-content-between'>
                <Link to={'/forget-password'}>Forget Password</Link>
                <Link to={"/signup"}>Doesn't Have an Account ? Please Signup</Link>
              </div>
            </div>
          </form>

        </div>

      </div>
    </>
  )
}

