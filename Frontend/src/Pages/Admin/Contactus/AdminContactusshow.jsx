import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import {useNavigate, useParams } from "react-router-dom";
import { getcontractus, updatecontractus, deletecontractus } from '../../../Redux/ActionCreator/ContractUsActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Admincontactus() {
  let [data, setdata] = useState({})
  let navigate = useNavigate()
  let dispach = useDispatch()
  let { id } = useParams()

  let contractusstatedata = useSelector(state => state.contractusstatedata)

  async function deleteitem() {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deletecontractus({ id: id }))
      getapidata();
      navigate("/admin/contactus")
    }
  }
 async function updateactive(id) {
     if (window.confirm("Are you sure to update active status")) {
       let item = contractusstatedata.find(x => x._id === id)
        item.active= !item.active;
        const Fromdata = new FormData()
        Object.keys(item).forEach(key=>
         Fromdata.append(key,item[key])
        )
       dispach(updatecontractus(Fromdata))
       getapidata();
     }
   }
  function getapidata() {
    dispach(getcontractus())
    if (contractusstatedata.length) {
      let item = contractusstatedata.find(x => x._id === id)
      if (item) {
        setdata(item)
      }
    }

  }
  useEffect(() => {
    getapidata()
  }, [contractusstatedata])

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
              Contactus
            </h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data._id?.slice(0,4)}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{data.message}</td>
                  </tr>
                  <tr>
                    <th>Active</th>
                    <td>{data.active ? "Yes" : "NO"}</td>
                  </tr>
                  <tr >
                    {data.active ? <><th colSpan={2}><button className="btn btn-primary w-100" onClick={()=>{updateactive(data._id)}}>Update</button></th></> : <> 
                      <th colSpan={2}><button className={`btn btn-danger w-100 ${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`} onClick={deleteitem}>Delete</button></th></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
