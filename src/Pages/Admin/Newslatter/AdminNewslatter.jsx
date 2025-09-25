import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { CreateNewslatter, getNewslatter, deleteNewslatter, updateNewslatter } from '../../../Redux/ActionCreator/NewsLetterActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Adminnewslatter() {
  let dispach = useDispatch()
  let newslatterstatedata = useSelector(state => state.newslatterstatedata)
  let [data, setdata] = useState([]);

  async function deleteitem(id) {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deleteNewslatter({ id: id }))
      getapidata();
    }
  }
  async function updateactive(id) {
    if (window.confirm("Are you sure to update active status")) {
      let item = newslatterstatedata.find(x => x._id === id)
      dispach(updateNewslatter({ ...item, active: !item.active }))
      getapidata();
    }
  }
  function getapidata() {
    dispach(getNewslatter())

    if (newslatterstatedata.length) {
      setdata(newslatterstatedata)
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    } else {
      setdata([])
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
  }, [newslatterstatedata])
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
              Admin Newsletter Section
            </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item) => {
                      return <tr key={item._id}>
                        <td>{item._id?.slice(0,4)}</td>
                        <td>{item.email}</td>
                        <td onClick={() => { updateactive(item._id) }} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                        <td
                          className={`${localStorage.getItem("role") === "Super Admin" ? "" : "d-none"}`}><button className="btn btn-danger" onClick={() => { deleteitem(item._id) }}><i className="fa fa-trash "></i></button></td>
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
