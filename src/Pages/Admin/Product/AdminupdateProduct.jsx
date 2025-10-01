// import React from 'react'
import React, { useEffect, useRef, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Formvalidator from "../../../Validator/Formvalidator";
import Filesvalidator from "../../../Validator/Filesvalidator";
import { getproduct, updateproduct } from "../../../Redux/ActionCreator/ProductActionCreator";
import { getmaincategory } from "../../../Redux/ActionCreator/MainctegoryActionCreator";
import { getsubcategory } from "../../../Redux/ActionCreator/SubctegoryActionCreator";
import { getbrand } from "../../../Redux/ActionCreator/BrandActionCreator"
import { useDispatch, useSelector } from "react-redux";

var rte;


export default function AdminupdateProduct() {

    var refdiv = useRef(null);
    let { id } = useParams()
    let navigate = useNavigate();
    let dispach = useDispatch();
    let productstatedata = useSelector(state => state.productstatedata);
    let maincategorystatedata = useSelector(state => state.maincategorystatedata);
    let subcategorystatedata = useSelector(state => state.subcategorystatedata);
    let brandstatedata = useSelector(state => state.brandstatedata);

    let [flag, setflag] = useState(false)

    let [data, setdata] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        disCount: 0,
        finalPrice: "",
        stock: true,
        stockQuantity: "",
        description: "",
        pic: [],
        active: true
    })
    let [errormassege, seterrormassege] = useState({
        name: "",
        color: "",
        size: "",
        basePrice: "",
        disCount: "",
        stockQuantity: "",
        pic: ""
    })


    let [show, setshow] = useState(false);

    function getinputdata(e) {
        var name = e.target.name
        // var value = e.target.files && e.target.files.length ? data.pic.concat(Array.from(e.target.files).map(x => x)) : e.target.value //For multipal files
        // var value = e.target.files && e.target.files.length ?  e.target.files[0] : e.target.value for real backend
        let value;
        if (e.target.files && e.target.files.length) {
            // multiple files ke liye
            let newFiles = Array.from(e.target.files);
            value = [...(data.pic || []), ...newFiles]
        } else {
            value = e.target.value;
        }

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
        let bp = parseInt(data.basePrice);
        let d = parseInt(data.disCount);
        let fp = parseInt(bp - bp * d / 100);
        let stockQuantity = parseInt(data.stockQuantity);
        let error = Object.values(errormassege).find(x => x !== "")
        if (error) {
            setshow(true)
        }
        else {
            const newdata = {
                ...data,
                basePrice: bp,
                disCount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                maincategory: data.maincategory ? data.maincategory : maincategorystatedata[0].name,
                subcategory: data.subcategory ? data.subcategory : subcategorystatedata[0].name,
                brand: data.brand ? data.brand : brandstatedata[0].name,
                description: rte.getHTMLCode(), // ✅ spelling fixed
            };

            const formData = new FormData();

            // append normal fields
            Object.keys(newdata).forEach((key) => {
                if (key !== "pic") {
                    formData.append(key, newdata[key]);
                }
            });

            // append multiple files
            if (data.pic && data.pic.length > 0) {
                for (let i = 0; i < data.pic.length; i++) {
                    formData.append("pic", data.pic[i]);
                }
            }


            dispach(updateproduct(formData))
            navigate("/admin/product");
        }
    }
    useEffect(() => {
        dispach(getproduct())
        if (productstatedata.length) {
            let item = productstatedata.find(x => x._id === id)
            setdata(item)
            rte = new window.RichTextEditor(refdiv.current);
            rte.setHTMLCode(item.description);
        }
    }, [])
    useEffect(() => {
        dispach(getmaincategory())
    }, [])

    useEffect(() => {
        dispach(getsubcategory())
    }, [])

    useEffect(() => {
        dispach(getbrand())
    }, [])

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
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
                            Product
                            <Link to="/admin/product">
                                <i className="fa fa-long-arrow-left text-light float-end"></i>
                            </Link>
                        </h5>
                        <form onSubmit={postinputdata}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" value={data.name} onChange={getinputdata} placeholder="please enter your name" className={`form-control border-3 border-primary ${show && errormassege.name ? "border-danger" : "border-primary"}`} />
                                {show && errormassege.name ? <p className="text-danger">{errormassege.name}</p> : null}
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">

                                    <label>Maincategory*</label>
                                    <select name="maincategory" value={data.maincategory} onChange={getinputdata} className="form-select border-3 border-primary" >
                                        {
                                            maincategorystatedata.filter(x => x.active).map((item) => {
                                                return <option key={item.id} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Subcategory*</label>
                                    <select className="form-select border-3 border-primary" value={data.subcategory} onChange={getinputdata} name="subcategory">
                                        {
                                            subcategorystatedata.filter(x => x.active).map((item) => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select></div>
                                <div className="col-md-3 mb-3">
                                    <label>Brand*</label>
                                    <select className="form-select border-3 border-primary" value={data.brand} onChange={getinputdata} name="brand">
                                        {
                                            brandstatedata.filter(x => x.active).map((item) => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>

                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select className="form-select border-3 border-primary" value={data.stock ? '1' : '0'} onChange={getinputdata}>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" value={data.basePrice} onChange={getinputdata} placeholder="Product Base Price" className={`form-control border-3 border-primary ${show && errormassege.basePrice ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.basePrice ? <p className="text-danger">{errormassege.basePrice}</p> : null}

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="disCount" onChange={getinputdata} value={data.disCount} placeholder="Product Discount" className={`form-control border-3 border-primary ${show && errormassege.disCount ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.disCount ? <p className="text-danger">{errormassege.disCount}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" name="color" value={data.color} onChange={getinputdata} placeholder="Product color" className={`form-control border-3 border-primary ${show && errormassege.color ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.color ? <p className="text-danger">{errormassege.color}</p> : null}

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Product Size*</label>
                                    <input type="number" name="size" value={data.size} onChange={getinputdata} placeholder="Product-size" className={`form-control border-3 border-primary ${show && errormassege.size ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.size ? <p className="text-danger">{errormassege.size}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Discription</label>
                                    <div className="col-md-12  form-control border-3 border-primary">
                                        <textarea rows={3} ref={refdiv} value={data.description} name="description" placeholder="Product Discription"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Stock Quentity*</label>
                                    <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getinputdata} placeholder="Stock Quantity" className={`form-control border-3 border-primary ${show && errormassege.stockQuantity ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.stockQuantity ? <p className="text-danger">{errormassege.stockQuantity}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getinputdata} className="form-select border-primary border-3">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" multiple name="pic" onChange={getinputdata} className={`form-control border-3 border-primary ${show && errormassege.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errormassege.pic ? (<p className="text-danger">{errormassege.pic}</p>) : null}
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label>Pic(Click on pic for delete)</label>
                                    {Array.isArray(data?.pic) &&
                                        data.pic.map((pic, index) => {
                                            const src = typeof pic === "string" ? pic : URL.createObjectURL(pic);
                                            return (
                                                <img
                                                    key={index}
                                                    onClick={() => {
                                                        const newPics = data.pic.filter((_, i) => i !== index);
                                                        setdata((old) => ({ ...old, pic: newPics }));
                                                    }}
                                                    src={src}
                                                    height={80}
                                                    width={70}
                                                    alt="preview"
                                                    className="me-2 cursor-pointer"
                                                />
                                            );
                                        })}

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
