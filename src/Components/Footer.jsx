import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewslatter, CreateNewslatter } from "./../Redux/ActionCreator/NewsLetterActionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function Footer() {
  let [email, setemail] = useState("");
  let [message, setmessage] = useState("");

  let newslatterstatedata = useSelector(state => state.newslatterstatedata);
  let dispatch = useDispatch()

  function postdata(e) {
    e.preventDefault()
    let item = newslatterstatedata.find((x) => x.email === email)
    if (item) {
      setmessage("This Email Address is Already Registered with us ")
    }
    else {
      dispatch(CreateNewslatter({ email: email }))
      setmessage("Thanks For Subscribe Our NewsLatter Service Now We Can Send Email Regarding New Products or Offer's")
      // setmessage("")
    }
    
  }


  useEffect(() => {
    (() => {
      dispatch(getNewslatter())
    })()
  }, [newslatterstatedata.length])

  return (
    <>
      <footer id="footer" className="footer">
        <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-6 text-light">
                <h4 className="text-light">Join Our Newsletter</h4>
                <p>
                  {message ? message : "Subscribe to our newsletter and receive the latest news about our products and services!"}
                </p>
                <form className="php-email-form" onSubmit={postdata}>
                  <div className="newsletter-form">
                    <input type="email" name="email" onChange={(e) => { setemail(e.target.value) }} value={email} />
                    <input type="submit" />
                  </div>
                  <div className="loading">Loading</div>
                  <div className="error-message">{message}</div>
                  <div className="sent-message">
                    {message ? message : 'Your subscription request has been sent. Thank you!'}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-top">
          <div className="row gy-4 text-light">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="d-flex align-items-center">
                <span className="sitename text-light">
                  {process.env.REACT_APP_SITE_NAME}
                </span>
              </Link>
              <div className="footer-contact pt-3">
                <p>{process.env.REACT_APP_SITE_ADDRESS}</p>
                <div className="mt-3">
                  <p>
                    <strong>Email:</strong>{" "}
                    <span>{process.env.REACT_APP_SITE_EMAIL}</span>
                  </p>
                  <strong>Phone:</strong>{" "}
                  <span>{process.env.REACT_APP_SITE_MOBILE}</span>
                </div>
                <p>
                  <strong>Whatsapp:</strong>{" "}
                  <span>+91 8092492943</span>
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className="text-light">Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/about">
                    About us
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/shop">
                    Shop
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/contractus">
                    Contract Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className="text-light">Our Services</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/features">
                    features
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/testomonial">
                    Testimonial
                  </Link>{" "}
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>{" "}
                  <Link className="text-light" to="/features">
                    Privacy Policy
                  </Link>{" "}
                </li>
                <li>
                  <i className="bi bi-chevron-right text-light"></i>
                  <Link className="text-light" to="/features">
                    Terms and condition
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 ">
              <h4 className="text-light">Follow Us</h4>
              <p className="text-light">
                Cras fermentum odio eu feugiat lide par naso tierra videa magna
                derita valies
              </p>
              <div className="social-links d-flex">
                <Link className="text-light" to={process.env.REACT_APP_SITE_TWITTER} rel="noreferrel" target="_blank" >
                  <i className="bi bi-twitter-x"></i>
                </Link>
                <Link className="text-light" to={process.env.REACT_APP_SITE_FACEBOOK} rel="noreferrel" target="_blank">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link className="text-light" to={process.env.REACT_APP_SITE_INSTAGRAM} rel="noreferrel" target="_blank" >
                  <i className="bi bi-instagram"></i>
                </Link>
                <Link className="text-light" to={process.env.REACT_APP_SITE_LINKEDIN} rel="noreferrel" target="_blank">
                  <i className="bi bi-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4 text-light">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">{process.env.REACT_APP_SITE_NAME}</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
      </footer>
    </>
  );
}
