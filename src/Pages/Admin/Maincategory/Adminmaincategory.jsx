import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getmaincategory, deletemaincategory } from '../../../Redux/ActionCreator/MainctegoryActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Adminhome() {
  let dispach = useDispatch()
  let maincategorystatedata = useSelector(state => state.maincategorystatedata)

  async function deleteitem(id) {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deletemaincategory({id:id}))
      getapidata();
    }
  }
  function getapidata() {
    dispach(getmaincategory())

    if (maincategorystatedata.length) {
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
  }, [maincategorystatedata.length])
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
              Maincategory
              <Link to="/admin/maincategory/create" className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Pic</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    maincategorystatedata.map((item) => {
                      return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td><Link to={`${process.env.REACT_APP_SITE_MAINCATEGORY}${item.pic}`} target="_blank">
                          <img src={`${process.env.REACT_APP_SITE_MAINCATEGORY}${item.pic}`} height={60} width={60} /></Link></td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td> <Link to={`/admin/maincategory/update/${item.id}`}><button className="btn btn-primary"><i className="fa fa-edit "></i></button></Link></td>
                        <td className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}><button className="btn btn-danger" onClick={() => { deleteitem(item.id) }}><i className="fa fa-trash "></i></button></td>
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
