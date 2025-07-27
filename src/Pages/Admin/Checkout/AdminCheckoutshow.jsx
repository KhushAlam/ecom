import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { getcheckout, updatecheckout } from "../../../Redux/ActionCreator/CheckOutActionCreator";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../../Components/Cart";

export default function Admincheckoutshow() {
  let [data, setdata] = useState({})
  let [OrderStatus, setorderStatus] = useState("");
  let [PaymentStatus, setpaymentstatus] = useState("")
  let [flag, setflag] = useState(false)

  let navigate = useNavigate()
  let dispach = useDispatch()


  let { id } = useParams()
  let [user, setuser] = useState({})

  let checkoutstatedata = useSelector(state => state.checkoutstatedata)

  // async function deleteitem() {
  //   if (window.confirm("Are you sure to delete item")) {
  //     dispach(deletecheckout({ id: id }))
  //     getapidata();
  //     navigate("/admin/contactus")
  //   }
  // }
  async function updatecheckoutshow() {
    if (window.confirm("Are you sure to update item")) {
      data.OrderStatus = OrderStatus;
      data.PaymentStatus = PaymentStatus;
      dispach(updatecheckout({
        ...data
      }))
      setflag(!flag)
    }
  }
  async function getapidata() {
    dispach(getcheckout())
    if (checkoutstatedata.length) {
      let item = checkoutstatedata.find(x => x.id === id)
      if (item) {
        setdata(item)
        setorderStatus(item.OrderStatus);
        setpaymentstatus(item.PaymentStatus);

        let responce = await fetch(`${process.env.REACT_APP_SITE_MAINCATEGORY}user/${item.user}`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        })
        responce = await responce.json()
        setuser(responce)
      }
      else {
        navigate("/admin/checkout")
      }
    }

  }
  useEffect(() => {
    getapidata()
  }, [checkoutstatedata.length])

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
              Checkout Item Details
            </h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>User</th>
                    <td>{user.name} <br />
                      {user.phone},{user.email} <br />
                      {user.address} <br />{user.pin},{user.city},{user.state}</td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{data.OrderStatus}
                      {data.OrderStatus !== "Delivered" ? <>
                        <select name="orderStatus" onChange={(e) => { setorderStatus(e.target.value) }} className="form-control form-select border border-primary rounded-3 shadow-sm">
                          <option>Order is Placed</option>
                          <option>Order is Packed</option>
                          <option>Order is Ready to Ship</option>
                          <option>Order is Shipped</option>
                          <option>Order is in Transit</option>
                          <option>Order is Reached at Final Delivery Station</option>
                          <option>Order is out for Delivery</option>
                          <option>Delivered</option>
                        </select></> : null}
                    </td>
                  </tr>
                  <tr>
                    <th>Payment Mode</th>
                    <td>{data.PaymentMode}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>{data.PaymentStatus}
                      {data.PaymentStatus !== "Done" ?
                        <>
                          <select name="PaymentStatus" onChange={(e) => { setpaymentstatus(e.target.value) }} className="form-control form-select border border-primary rounded-3 shadow-sm" >
                            <option>Pending</option>
                            <option>Done</option>
                          </select>
                        </>
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <th>Subtotal</th>
                    <td>&#8377;{data.subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>&#8377;{data.shipping}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>&#8377;{data.total}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>RPPID</th>
                    <td>{data.RPPID ? data.RPPID : "N/A"}</td>
                  </tr>
                  <tr >
                    <td colSpan={2}>
                      {data.OrderStatus !== "Delivered" || data.PaymentStatus !== "Done" ? <button className="btn btn-primary w-100" onClick={updatecheckoutshow}>Update</button> : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {data.product && data.product.length ? <Cart title="Products in order" data={data.product} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
