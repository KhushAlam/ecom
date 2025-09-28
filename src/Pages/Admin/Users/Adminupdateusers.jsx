// import React from 'react'
import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Formvalidator from "../../../Validator/Formvalidator";
import Filesvalidator from "../../../Validator/Filesvalidator";
import { getusers, updateusers } from "../../../Redux/ActionCreator/AdminUserActionCreator";
import { useDispatch, useSelector } from "react-redux";


export default function Adminupdateusers() {

    let dispach = useDispatch();
    let userstatedata = useSelector(state => state.userstatedata);
    let { id } = useParams()
    let navigate = useNavigate();
    let [data, setdata] = useState({
        name: "",
        username: "",
        phone: "",
        pic:"",
        email: "",
        password: "",
        cpassword: "",
        role: "Admin",
        active: true
    })
    let [errormassege, seterrormassege] = useState({
        name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
        pic:""
    })

    let [show, setshow] = useState(false);

    function getinputdata(e) {
        // var { name, value } = e.target
        var name = e.target.name
        var value = e.target.files && e.target.files.length ?  e.target.files[0] : e.target.value

        seterrormassege((old) => {
            return {
                ...old,
                [name]: Formvalidator(e)
            }
        })

        setdata((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }
    async function postinputdata(e) {
        e.preventDefault()
        let error = Object.values(errormassege).find(x => x !== "")
        if (error) {
            setshow(true)
        }
        else {
            let item = userstatedata.find(x => x._id !== id &&
                (x.username?.toLowerCase() === data.username?.toLowerCase()
                    || x.email?.toLowerCase() === data.email?.toLowerCase()))
            if (item) {
                setshow(true)
                seterrormassege((old) => {
                    return {
                        ...old,
                        'name': ''
                    }
                })
                return
            }

            const Fromdata= new FormData()
            Object.keys(data).forEach(key=>{
                Fromdata.append(key,data[key]);
            })

            dispach(updateusers(Fromdata))
            navigate("/admin/user");
        }
    }
    useEffect(() => {
        dispach(getusers())
        if (userstatedata.length) {
            let item = userstatedata.find(x => x._id === id)
            if (!item) {
                navigate("/admin/user")
                return;
            }
            if (item.role === "Buyer") {
                navigate("/admin/user")
            }
            setdata(item)
        }
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
                            User
                            <Link to="/admin/user">
                                <i className="fa fa-long-arrow-left text-light float-end"></i>
                            </Link>
                        </h5>
                        <form onSubmit={postinputdata}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getinputdata} placeholder=" Enter Full name" className={`form-control border-3 border-primary ${show && errormassege.name ? "border-danger" : "border-primary"}`} disabled />
                                    {show && errormassege.name ? <p className="text-danger">{errormassege.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="number" name="phone" value={data.phone} placeholder="Phone number" onChange={getinputdata} className={`form-control border-3 border-primary ${show && errormassege.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errormassege.phone ? (<p className="text-danger">{errormassege.phone}</p>) : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Username*</label>
                                    <input type="text" name="username" value={data.username} onChange={getinputdata} placeholder=" Enter your username" className={`form-control border-3 border-primary ${show && errormassege.username ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.username ? <p className="text-danger">{show && errormassege.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" value={data.email} onChange={getinputdata} placeholder=" Enter your Email" className={`form-control border-3 border-primary ${show && errormassege.email ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.email ? <p className="text-danger">{errormassege.email}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getinputdata} placeholder=" Enter your Password" className={`form-control border-3 border-primary ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.password ? <p className="text-danger">{errormassege.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Conform Password*</label>
                                    <input type="password" name="cpassword" onChange={getinputdata} placeholder=" Enter your conform password" className={`form-control border-3 border-primary ${show && errormassege.cpassword ? "border-danger" : "border-primary"}`} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getinputdata}  className={`form-control border-3 border-primary ${show && errormassege.pic ? "border-danger" : "border-primary"}`} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" value={data.role ? data.role : "Buyer"} onChange={getinputdata} className={`form-control form-select border-3 border-primary ${show && errormassege.role ? "border-danger" : "border-primary"}`}>
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Buyer">Buyer</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getinputdata} className="form-select border-primary border-3">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary text-light text-center w-100">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
