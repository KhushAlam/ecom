import React, { useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom';
import Formvalidator from '../Validator/Formvalidator';
export default function SignupPage() {
    let navigate = useNavigate();
    let [data, setdata] = useState({
        name: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        cpassword: ""
    });
    let [errormassege, seterrormassege] = useState({
        name: "Name Feild is Mendetory",
        phone: "Phone Number is Mendetory",
        username: "Username is Mendetory",
        email: "Email Feild is Mendetory",
        password: "Password Feild is Mendatory",
        // cpassword: "Conform Password is Mendatory"
    });
    let [show, setshow] = useState(false)
    function getiputdata(e) {
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

    async function postinputdata(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            let item = Object.values(errormassege).find(x => x !== "")
            if (item) {
                setshow(true);
            }
            else {

                let response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    },
                })
                response = await response.json();
                let item = response.find(x => (x.username?.toLowerCase() === data.username?.toLowerCase()) || (x.email.toLowerCase() === data.email?.toLowerCase()))
                if (item) {
                    setshow(true);
                    seterrormassege((old) => {
                        return {
                            ...old,
                            "username": item.username?.toLowerCase() === data.username?.toLowerCase() ? "UserName Already Taken" : "",
                            "email": item.email?.toLowerCase() === data.email?.toLowerCase() ? "Email Already Taken" : ""
                        }
                    })
                    return
                }
                response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        active: true
                    })
                })
                response = await response.json()
                navigate("/login")

            }
        } else {
            setshow(true);
            seterrormassege((old) => {
                return {
                    ...old,
                    "password": "Password and conform password not match"
                }
            })
        }
    }
    return (
        <>
            <Breadcrum title="Signup - Create Your Account" />
            <div className="container-fluid my-2">
                <div className="row">
                    <form onSubmit={postinputdata}>
                        <div className="col-lg-9 col-md-10 col-sm-11 m-auto">
                            <h5 className='bg-primary text-light text-center p-1'>Create Your Account</h5>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" onChange={getiputdata} placeholder='Enter Your Name' className={`border-3 form-control ${show && errormassege.name ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.name ? <p className='text-danger'>{errormassege.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" onChange={getiputdata} placeholder='Enter phone Number' className={`border-3 form-control ${show && errormassege.phone ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.phone ? <p className='text-danger'>{errormassege.phone}</p> : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" onChange={getiputdata} placeholder='Enter UserName' className={`border-3 form-control ${show && errormassege.username ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.username ? <p className='text-danger'>{errormassege.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="email" onChange={getiputdata} placeholder='Enter email Address' className={`border-3 form-control ${show && errormassege.email ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.email ? <p className='text-danger'>{errormassege.email}</p> : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" onChange={getiputdata} placeholder='Enter password' className={`border-3 form-control ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.password ? <p className='text-danger'>{errormassege.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" onChange={getiputdata} placeholder='Enter conform Password' className={`border-3 form-control ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                </div>
                            </div>
                            <div className=" mb-3"><button type="submit" className='form control border-3 btn btn-primary w-100'>SingnUp</button></div>
                            <div className='col-md-6'>
                                <Link to={"/login"}>Already Have Account ? Please Login</Link>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}
