import React, { useState } from "react";
import Breadcrum from "../Components/Breadcrum";
import Formvalidator from "../Validator/Formvalidator";
import { createcontractus } from "../Redux/ActionCreator/ContractUsActionCreator";
import { useDispatch } from "react-redux";

export default function ContractUsPage() {
  let [data, setdata] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
    active: true,
    date: new Date()
  })

  let [error, seterrormassege] = useState({
    name: "Feild is required",
    email: "Feild is required",
    subject: "Feild is required",
    phone: "Feild is required",
    message: "Feild is required",
  })
  let [show, setshow] = useState(false);
  let [message1, setmessage] = useState("");
  let dispatch = useDispatch()

  function getinputdata(e) {
    let { name, value } = e.target;

    seterrormassege((old) => {
      return {
        ...old,
        [name]: Formvalidator(e)
      }
    })

    setdata((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  function postdata(e) {
    e.preventDefault()
    let erro = Object.values(error).find(x => x !== "")
    if (erro) {
      setshow(true)
    } else {

      const Fromdata = new FormData()
      Object.keys(data).forEach(key => {
        Fromdata.append(key, data[key]);
      })
      dispatch(createcontractus(Fromdata))

      setdata({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: ""
      })
      setmessage("Thank You to share Your Query With us. Our Team Contact You Soon")
    }
  }
  return (
    <>
      <Breadcrum title="ContractUs" />
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          {/* <h2>Contact</h2> */}
          <p>Contact Us Section</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-md-6 text-center">
                  <div className="info-item  " data-aos="fade" data-aos-delay="200">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>{process.env.REACT_APP_SITE_ADDRESS}</p>
                  </div>
                </div>

                <div className="col-md-6 text-center">
                  <div className="info-item " data-aos="fade" data-aos-delay="300">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>{process.env.REACT_APP_SITE_MOBILE}</p>
                    <p>+91 7324935063</p>
                  </div>
                </div>

                <div className="col-md-6 text-center">
                  <div className="info-item" data-aos="fade" data-aos-delay="400">
                    <i className="bi bi-envelope"></i>
                    <p>Email Address</p>
                    <p>{process.env.REACT_APP_SITE_EMAIL}</p>
                  </div>
                </div>

                <div className="col-md-6 text-center">
                  <div className="info-item " data-aos="fade" data-aos-delay="500">
                    <i className="bi bi-clock"></i>
                    <h3>Whatsapp</h3>
                    <p>Monday - Friday</p>
                    <p><a href={`https://wa.me/${process.env.REACT_APP_SITE_WHATSAPP}`} target="_blank" > WhatsApp</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form
                className="form"
                // data-aos="fade-up"
                // data-aos-delay="200"
                onSubmit={postdata}
              >
                <div className="row gy-4">
                  <p className="text-center mt-4">{message1 ? message1 : "Do You have any Query Contract With us"}</p>
                  <div className="col-md-12 ">
                    <input type="text" name="name" className={`form-control ${show && error.name ? 'border-danger' : ""} `} value={data.name} placeholder="Enter Your Name" onChange={getinputdata} />
                    {show && error.name ? <p className="text-danger">{error.name}</p> : null}
                  </div>
                  <div className="col-md-6 ">
                    <input type="email" name="email" className={`form-control ${show && error.email ? 'border-danger' : ""} `} value={data.email} placeholder="Enter Your Email" onChange={getinputdata} />
                    {show && error.email ? <p className="text-danger">{error.email}</p> : null}
                  </div>
                  <div className="col-md-6 ">
                    <input type="number" name="phone" className={`form-control ${show && error.phone ? 'border-danger' : ""} `} value={data.phone} placeholder="Enter Your Phone Number" onChange={getinputdata} />
                    {show && error.phone ? <p className="text-danger">{error.phone}</p> : null}

                  </div>
                  <div className="col-md-12 ">
                    <input type="text" name="subject" className={`form-control ${show && error.subject ? 'border-danger' : ""} `} value={data.subject} placeholder="Enter Your Subject" onChange={getinputdata} />
                    {show && error.subject ? <p className="text-danger">{error.subject}</p> : null}
                  </div>
                  <div className="col-md-12 ">
                    <textarea name="message" className={`form-control ${show && error.message ? 'border-danger' : ""} `} rows={5} value={data.message} placeholder="Enter Your Message...." onChange={getinputdata}></textarea>
                    {show && error.message ? <p className="text-danger">{error.message}</p> : null}
                  </div>
                  <div className="col-12 ">
                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-5">
          <iframe style={{ height: "300px", width: "100%", border: 0 }} frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=Areaj+govindapur+845411&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div>
      </section>
    </>
  );
}
