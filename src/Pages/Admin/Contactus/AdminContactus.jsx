import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getcontractus, updatecontractus, deletecontractus } from '../../../Redux/ActionCreator/ContractUsActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Admincontactus() {
  let dispach = useDispatch()
  let contractusstatedata = useSelector(state => state.contractusstatedata)

  async function deleteitem(id) {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deletecontractus({ id: id }))
      getapidata();
    }
  }
  async function updateactive(id) {
    if (window.confirm("Are you sure to update active status")) {
      let item = contractusstatedata.find(x => x._id === id)
      dispach(updatecontractus({ ...item, active: !item.active }))
      getapidata();
    }
  }
  function getapidata() {
    dispach(getcontractus())
    if (contractusstatedata.length) {
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
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
            <h5 className="text-center p-2 bg-primary text-light"> Admin Contact Us Section </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Active</th>
                    <th>Show</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    contractusstatedata?.map((item) => {
                      return <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td onClick={() => { updateactive(item.id) }} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                        <td><Link to={`${item._id}`}><button className="btn btn-primary"><i className="fa fa-eye"></i></button></Link></td>
                        <td className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>{!item.active ? <><button className={`btn btn-danger`} onClick={() => { deleteitem(item._id) }}><i className="fa fa-trash "></i></button></> : null}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
