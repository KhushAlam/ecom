import React from "react";
import Navbarfunction from "./Navbarfunction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import Breadcrum from './Breadcrum'
export default function Navbar() {
  let navigate = useNavigate()
  async function logout() {

    const token = localStorage.getItem("token");
    let responce = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    let data = await responce.json()
    if (!data) return

    toast.sucess(data?.msg, { autoClose: 3000 });
    localStorage.removeItem("name")
    localStorage.removeItem("login")
    localStorage.removeItem("userid")
    localStorage.removeItem("role")
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <>
      <Navbarfunction />
      <div className="topbar bg-primary overflow-hidden w-full">
        <div className="row">
          <div className="col-md-9 col-6">
            <div className="ms-3 pt-2">
              <Link className="me-3" to="mailto:khush735265@gmail.com">
                <i className=" me-1 text-light bi bi-envelope"></i>
                <span className="text-light d-none d-md-inline fs-6">
                  khush735265@gmail.com
                </span>
              </Link>
              <a className="me-3" href="tel:+918092492943">
                <i className="me-1 text-light bi bi-phone"></i>
                <span className="text-light d-none d-md-inline fs-6">
                  +91 8092492943
                </span>
              </a>
              <a className="me-3" href="https://wa.me/918092492943" target="_blank" rel="noopener noreferrer">
                <i className="me-1 text-light bi bi-whatsapp"></i>
                <span className="text-light d-none d-md-inline fs-6">
                  +91 8092492943
                </span>
              </a>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="float-end fs-5 ">
              <Link
                className="me-3"
                to={process.env.REACT_APP_SITE_FACEBOOK}
                target="_blank"
                rel="noreferrer"
              >
                <i className=" text-light bi bi-facebook"></i>
              </Link>
              <Link
                className="me-3"
                to={process.env.REACT_APP_SITE_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
              >
                <i className=" text-light bi bi-instagram"></i>
              </Link>
              <Link
                className="me-3"
                to={process.env.REACT_APP_SITE_LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                <i className=" text-light bi bi-linkedin"></i>
              </Link>
              <Link
                className="me-3"
                to={process.env.REACT_APP_SITE_TWITTER}
                target="_blank"
                rel="noreferrer"
              >
                <i className=" text-light bi bi-twitter"></i>
              </Link>
              <Link
                className="me-3"
                to={process.env.REACT_APP_SITE_YOUTUBE}
                target="_blank"
                rel="noreferrer"
              >
                <i className=" text-light bi bi-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <header
        id="header"
        className="header d-flex align-items-center sticky-top "
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto"
          >
            <h1 className="sitename">{process.env.REACT_APP_SITE_NAME}</h1>
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/features">Features</NavLink>
              </li>
              <li>
                <NavLink to="/testomonial">Testonomial</NavLink>
              </li>
              <li><NavLink to="/admin">Admin</NavLink></li>
              <li>
                <NavLink to="/contractus">Contact Us</NavLink>
              </li>
              {
                localStorage.getItem("login") ?
                  (
                    <div className="dropdown ms-5">
                      <button className="btn btn-primary border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {localStorage.getItem("name")}
                      </button>
                      <ul className="dropdown-menu">
                        {
                          localStorage.getItem("role") === "Buyer" ? (
                            <>
                              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                              <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                              <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
                            </>
                          ) : (
                            <li><Link className="dropdown-item" to="/admin">Profile</Link></li>
                          )
                        }
                        <li><button onClick={logout} className="dropdown-item border-0 bg-white">Logout</button>
                          <ToastContainer /></li>
                      </ul>
                    </div>
                  )
                  : <Link to="/login" className="btn-getstarted flex-md-shrink-0">Login</Link>
              }
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>


        </div>
      </header>
      {/* <Breadcrum/>  */}
    </>
  );
}
