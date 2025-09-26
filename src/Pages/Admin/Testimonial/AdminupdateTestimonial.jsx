// import React from 'react'
import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Formvalidator from "../../../Validator/Formvalidator";
import Filesvalidator from "../../../Validator/Filesvalidator";
import { gettestimonial, updatetestimonial } from "../../../Redux/ActionCreator/TestimonialActionCreator";
import { useDispatch, useSelector } from "react-redux";


export default function AdminupdateTestimonial() {

    let dispach = useDispatch();
    let testimonialstatedata = useSelector(state => state.testimonialstatedata);
    let { id } = useParams()
    let navigate = useNavigate();
    let [data, setdata] = useState({
        name: "",
        pic: "",
        message: "",
        active: true
    })
    let [errormassege, seterrormassege] = useState({
        name: "",
        pic: "",
        message: ""
    })

    let [show, setshow] = useState(false);

    function getinputdata(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

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
    async function postinputdata(e) {
        e.preventDefault()
        let error = Object.values(errormassege).find(x => x !== "")
        if (error) {
            setshow(true)
        }
        else {
            let item = testimonialstatedata.find(x => x._id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setshow(true)
                seterrormassege((old) => {
                    return {
                        ...old,
                        'name': 'Same Name in Testimonial is Already exits!'
                    }
                })
                return
            }
            const Fromdata = new FormData()
            Object.keys(data).forEach(key => {
                Fromdata.append(key, data[key])
            })
            dispach(updatetestimonial(Fromdata))
            navigate("/admin/testimonial");
        }
    }
    useEffect(() => {
        dispach(gettestimonial())
        if (testimonialstatedata?.length) {
            setdata(testimonialstatedata?.find(x => x._id === id))
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
                            Testimonial
                            <Link to="/admin/testimonial">
                                <i className="fa fa-long-arrow-left text-light float-end"></i>
                            </Link>
                        </h5>
                        <form onSubmit={postinputdata}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" value={data.name} onChange={getinputdata} placeholder="please enter your name" className={`form-control border-3 border-primary ${show && errormassege.name ? "border-danger" : "border-primary"}`} />
                                {show && errormassege.name ? <p className=" text-danger">{errormassege.name}</p> : null}
                            </div>
                            <div className="mb-3">
                                <label>Message*</label>
                                <textarea name="message" value={data.message} onChange={getinputdata} className={`form-control border-3 ${show && errormassege.message ? 'border-danger' : 'border-primary'}`} placeholder="Message..."></textarea>
                                {show && errormassege.message ? <p className="text-danger">{errormassege.message}</p> : null}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">

                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getinputdata} className={`form-control border-3 border-primary ${show && errormassege.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errormassege.pic ? (<p className=" text-danger">{errormassege.pic}</p>) : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active</label>
                                    <select name="active" value={data.active ? "1" : '0'} onChange={getinputdata} className="form-select border-primary border-3">
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
