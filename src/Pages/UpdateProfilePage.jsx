import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { useNavigate } from 'react-router-dom';
import Formvalidator from '../Validator/Formvalidator';
import Filesvalidator from '../Validator/Filesvalidator';

export default function UpdateProfilePage() {
    let navigate = useNavigate();
    let [data, setdata] = useState({
        name: "",
        phone: "",
        username: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        pic: "",
        password: "",
        cpassword: "",
        role: ""

    });
    let [errormassege, seterrormassege] = useState({
        name: "",
        phone: "",
        username: "",
        email: "",
        pic: ""
        // cpassword: "Conform Password is Mendatory"
    });
    let [show, setshow] = useState(false)
    function getiputdata(e) {
        let name = e.target.name;
        let value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

        seterrormassege((old) => {
            return {
                ...old,
                [name]: e.target.files ? Filesvalidator(e) : Formvalidator(e)
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
        let item = Object.values(errormassege).find(x => x !== "")
        if (item) {
            setshow(true);
        }
        else {
            let response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/get`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            response = await response.json();
            let item = response?.data.find(x => x._id !== localStorage.getItem("userid") && ((x.username?.toLowerCase() === data.username?.toLowerCase()) || (x.email.toLowerCase() === data.email?.toLowerCase())))
            if (item) {
                setshow(true);
                return
            }
            const Fromdata = new FormData()
            Object.keys(data).forEach(key =>
                Fromdata.append(key, data[key])
            )
            response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/update/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                },
                body: Fromdata
            })
            response = await response.json()
            if (localStorage.getItem("role") === "Buyer")
                navigate("/profile")
            else navigate("/admin")

        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/get/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response) {
                setdata({
                    name: response.data.name || "",
                    phone: response.data.phone || "",
                    username: response.data.username || "",
                    email: response.data.email || "",
                    address: response.data.address || "",
                    city: response.data.city || "",
                    state: response.data.state || "",
                    pin: response.data.pin || "",
                    pic: response.data.pic || "",
                    password: response.data.password || "",
                    role: response.data.role || "",

                })
            }
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Update profile" />
            <div className="container-fluid my-2">
                <div className="row">
                    <form onSubmit={postinputdata}>
                        <div className="col-lg-9 col-md-10 col-sm-11 m-auto">
                            <h5 className='bg-primary text-light text-center p-1'>Update Your Profile</h5>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} onChange={getiputdata} placeholder='Enter Your Name' className={`border-3 form-control ${show && errormassege.name ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.name ? <p className='text-danger'>{errormassege.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" value={data.phone} onChange={getiputdata} placeholder='Enter phone Number' className={`border-3 form-control ${show && errormassege.phone ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.phone ? <p className='text-danger'>{errormassege.phone}</p> : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" value={data.username} disabled onChange={getiputdata} placeholder='Enter UserName' className={`border-3 form-control ${show && errormassege.username ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.username ? <p className='text-danger'>{errormassege.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="email" value={data.email} disabled onChange={getiputdata} placeholder='Enter email Address' className={`border-3 form-control ${show && errormassege.email ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.email ? <p className='text-danger'>{errormassege.email}</p> : null}
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="pasword" value={data.password} onChange={getiputdata} placeholder='Enter password' className={`border-3 form-control ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.password ? <p className='text-danger'>{errormassege.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" value={data.password} onChange={getiputdata} placeholder='Enter conform password' className={`border-3 form-control ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.password ? <p className='text-danger'>{errormassege.password}</p> : null}
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <textarea name="address" onChange={getiputdata} value={data.address} className='form-control border-3 border-primary' placeholder='Address...'></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="city" value={data.city} onChange={getiputdata} placeholder='Enter City' className={`form-control border-3 border-primary`} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="state" value={data.state} onChange={getiputdata} placeholder='Enter state' className={`border-3 form-control border-primary`} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="number" name="pin" value={data.pin} onChange={getiputdata} placeholder='Enter Pin Code' className={`border-3 form-control border-primary`} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="file" name="pic" onChange={getiputdata} className={`border-3 form-control ${show && errormassege.pic ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.pic ? <p className='text-danger'>{errormassege.pic}</p> : null}
                                </div>
                            </div>
                            <div className=" mb-3"><button type="submit" className='form control border-3 btn btn-primary w-100'>Update</button></div>

                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}
