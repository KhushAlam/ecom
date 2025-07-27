import React, { useEffect, useState } from 'react'
import Breadcrum from './Breadcrum'
import { Link, useNavigate } from 'react-router-dom'
import Formvalidator from '../Validator/Formvalidator'

export default function Forgetpassword() {
    let navigate = useNavigate()
    let [data, setdata] = useState({
        username: "",
        password: "",
        active:true,
        
    })
    let [errormassege, seterrormassege] = useState({
        username: "Feild is Mendetory",
        password: "Feild is Mendetory"
    })

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
        let item = Object.values(errormassege).find(x => x !== "")
        if (item) {
            setshow(true);
        }
        else {
            let responce = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            responce = await responce.json();
            let existuser = responce.find(x => x.username === data.username);
            
            if (existuser) {
                let responce = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/${existuser.id ? existuser.id : ""}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
                
                responce = await responce.json()
                navigate('/login')
            }
            else {
                setshow(true)
                seterrormassege((old) => {
                    return {
                        ...old,
                        'username': "User name not Found Please Signup"
                    }
                })
            }
        }
    }
    return (
        <>
            <Breadcrum title="Forget Your Password" />
            <div className="container-fluid my-2">
                <div className="row">
                    <form onSubmit={postinputdata}>
                        <div className="col-lg-7 col-md-8 col-sm-10 m-auto">
                            <h5 className='bg-primary text-light text-center p-1'>Change Your Password</h5>
                            <div className="row">
                                <div className=" mb-3">
                                    <input type="text" name="username" onChange={getiputdata} placeholder='Enter UserName' className={`border-3 form-control ${show && errormassege.username ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.username ? <p className='text-danger'>{show && errormassege.username}</p> : null}
                                </div>
                                <div className=" mb-3">
                                    <input type="password" name="password" onChange={getiputdata} placeholder='Enter new password' className={`border-3 form-control ${show && errormassege.password ? "border-danger" : "border-primary"}`} />
                                    {show && errormassege.password ? <p className='text-danger'>{show && errormassege.password}</p> : null}
                                </div>
                            </div>
                            <div className=" mb-3"><button type="submit" className='form control border-3 btn btn-primary w-100'>Change Password</button></div>
                            <div className='mb-3 d-flex justify-content-between'>
                                {/* <Link to={'/forget-password'}>Forget Password</Link> */}
                                <Link to={"/login"}>Login into system</Link>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}
