import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getproduct, deleteproduct } from '../../../Redux/ActionCreator/ProductActionCreator';
import { useDispatch, useSelector } from "react-redux";

export default function Adminproduct() {
  let dispach = useDispatch()
  let productstatedata = useSelector(state => state.productstatedata)
  async function deleteitem(id) {
    if (window.confirm("Are you sure to delete item")) {
      dispach(deleteproduct({ id: id }))
      getapidata();
    }
  }
  function getapidata() {
    dispach(getproduct())

    if (productstatedata.length) {
      let time = setTimeout(() => {
        $('#myTable').DataTable()
      }, 300)
      return time
    }

  }
  useEffect(() => {
    let time = getapidata()
    return () => clearTimeout(time)
  }, [productstatedata.length])
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
              <Link to="/admin/product/create" className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table id="myTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Maincategory</th>
                    <th>Subcategory</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th>Stock</th>
                    <th>StockQuentity</th>
                    <th>Pic</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th className={`${localStorage.getItem("role")==="Super Admin"?"":"d-none"}`}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productstatedata.map((item) => {
                      return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.maincategory}</td>
                        <td>{item.subcategory}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>{item.basePrice}</td>
                        <td>{item.disCount}</td>
                        <td>{item.finalPrice}</td>
                        <td>{item.stock?"Yes":"No"}</td>
                        <td>{item.stockQuantity}</td>
                        <td><div className="testimonial-message">
                          {
                           item.pic.map((pic,index)=>{
                            return <Link to={`${process.env.REACT_APP_SITE_MAINCATEGORY}${pic}`} target="_blank">
                              <img src={`${process.env.REACT_APP_SITE_MAINCATEGORY}${pic}`} height={80} width={70} className="me-2"/></Link>
                           })  
                          }
                      
                        </div>
                        </td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td> <Link to={`/admin/product/update/${item.id}`}><button className="btn btn-primary"><i className="fa fa-edit "></i></button></Link></td>
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
