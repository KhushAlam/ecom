import React, { useEffect } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  let navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("role") !== "Buyer" && window.location.pathname === "/admin")
          navigate(0)
        if (localStorage.getItem("role") === "Buyer" && window.location.pathname === "/profile")
          navigate(0)
        // if(localStorage.getItem("role") === "Buyer" && window.location.pathname === "/admin")
        //   navigate(0)
      }
    }, 500);
  }, [window.location.href])
  return (
    <>
      <Breadcrum title={"404 Page Not Found!"} />
      <div className="container-fluid ">
        {/* <!-- Error 404 Template 1 - Bootstrap Brain Component --> */}
        <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="container-xxl py-5 wow fadeInup">
            <div className="row ">
              <div className="col-12 ">
                <div className="text-center ">
                  <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <span className="display-1 fw-bold text-primary">4</span>
                    <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                    <span className="display-1 fw-bold bsb-flip-h text-primary">4</span>
                  </h2>
                  <h3 className='h2 mb-3'>{localStorage.getItem("role") === "Buyer" ? " Oops! You Can't Access Admin Section Details" : null}</h3>
                  <h3 className="h2 mb-2">Oops! Page Not Find.</h3>
                  <p className="mb-5">The page you are looking for was not found.</p>
                  <p className="mb-5 text-capitalize">You might be seeing this because you're not logged in. Please log in to continue.</p>
                  <Link className="btn bsb-btn-5xl btn-primary rounded-pill px-5 fs-6 m-0" to="/">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
