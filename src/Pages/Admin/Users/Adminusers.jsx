import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getusers, deleteusers } from '../../../Redux/ActionCreator/AdminUserActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Adminusers() {
  let dispach = useDispatch()
  let userstatedata = useSelector(state => state.userstatedata)

  async function deleteitem(id) {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deleteusers({ id: id }))
      getapidata();
    }
  }
  function getapidata() {
    dispach(getusers())

    if (userstatedata.length) {
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
  }, [userstatedata])
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
              {localStorage.getItem("role")==="Super Admin"?<><Link to="/admin/user/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link></>:null}
            </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userstatedata.map((item) => {
                      return <tr key={item._id}>
                        <td>{item._id?.slice(0,4)}</td>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td> {item.role !== "Buyer" ? <Link to={`/admin/user/update/${item._id}`}><button className="btn btn-primary"><i className="fa fa-edit "></i></button></Link> : null}</td>
                        <td className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}><button className="btn btn-danger" onClick={() => { deleteitem(item._id) }}><i className="fa fa-trash "></i></button></td>
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
