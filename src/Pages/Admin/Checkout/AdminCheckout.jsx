import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getcheckout } from '../../../Redux/ActionCreator/CheckOutActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Admincheckout() {
  let dispach = useDispatch()
  let checkoutstatedata = useSelector(state => state.checkoutstatedata)

  // async function deleteitem(id) {
  //   if (window.confirm("Are you sure to delete item")) {
  //     dispach(deletecontractus({ id: id }))
  //     getapidata();
  //   }
  // }
  // async function updateactive(id) {
  //   if (window.confirm("Are you sure to update active status")) {
  //     let item = checkoutstatedata.find(x => x.id === id)
  //     dispach(updatecontractus({ ...item, active: !item.active }))
  //     getapidata();
  //   }
  // }
  function getapidata() {
    dispach(getcheckout())
    if (checkoutstatedata.length) {
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
  }, [checkoutstatedata])

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="text-center p-2 bg-primary text-light"> Admin CheckOut Section </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Order</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Subtotal</th>
                    <th>Shipping</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Show</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    checkoutstatedata?.map((item) => {
                      return <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.user}</td>
                        <td>{item.OrderStatus}</td>
                        <td>{item.PaymentMode}</td>
                        <td>{item.PaymentStatus}</td>
                        <td>&#8377;{item.subtotal}</td>
                        <td>&#8377;{item.shipping}</td>
                        <td>&#8377;{item.total}</td>
                        <td><div>{new Date(item.date).toLocaleString()}</div></td>
                        <td><Link to={`${item.id}`}><button className="btn btn-primary"><i className="fa fa-eye"></i></button></Link></td>
                        {/* <td>{!item.active ? <><button className="btn btn-danger"><i className="fa fa-trash "></i></button></> : null}</td> */}
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
