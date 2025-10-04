import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import Profile from '../Components/Profile'
import { getwishlist, deletewishlist } from "./../Redux/ActionCreator/WishListActionCreator";
import { getcheckout } from "./../Redux/ActionCreator/CheckOutActionCreator";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Components/Cart';

export default function UserProfile() {

  let [data, setdata] = useState([]);
  let [orders, setorders] = useState([]);


  let dispatch = useDispatch();
  let navigate = useNavigate();
  // console.log(data)
  let wishliststatedata = useSelector(state => state.wishliststatedata);
  let checkoutstatedata = useSelector(state => state.checkoutstatedata);


  function getapidata() {
    dispatch(getwishlist())
    if (wishliststatedata) {
      setdata(wishliststatedata.filter(x => x.user === localStorage.getItem("userid")))
    }
    else {
      setdata([]);
    }
  }
  function handledeletewishlist(id) {
    if (window.confirm("Are you Sure to delete")) {
      dispatch(deletewishlist({ id: id }))
      getapidata()
    }
  }


  useEffect(() => {
    getapidata()
  }, [wishliststatedata])


  useEffect(() => {
    (() => {
      dispatch(getcheckout())
      if (checkoutstatedata?.length) {
        setorders(checkoutstatedata?.filter((x) => x.user === localStorage.getItem("userid")))
      }else{
        setorders([])
      }
    })()
  }, [])


  return (
    <>
      <Breadcrum title="User Profile" />
      <div className="container my-2">
        <Profile title="Buyer" />
        <h5 className='form-control btn btn-primary w-100'>Wishlist section</h5>
        {
          data ?
            <>
            <div className="table-responsive">
              <table className='table table-bordered table-striped table-hover'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Stock</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item) => {
                      return <tr key={item._id}>
                        <td><Link to={`${item.pic}`} target='_blank' rel='noreferrer'></Link>
                          <img src={`${item.pic}`} height={50} width={80} /></td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>{item.stock ? `${item.stockquentity} are left` : "Out of Stock"}</td>
                        <td>&#8377;{item.price}</td>
                        <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='fa fa-shopping-cart fs-5  text-light '></i></Link></td>
                        <td><button className='btn btn-danger' onClick={() => { handledeletewishlist(item._id) }}><i className='fa fa-trash fs-5 b text-light'></i></button></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              </div>
            </> : <div className='justify-content-center'><h5 className='text-center w-100 text-danger'>No item in Wishlist</h5>
              <Link to="/shop" className='btn btn-primary text-center w-10 my-2 ms-6'> Shop Now</Link></div>
        }
         <h5 className='form-control btn btn-primary w-100'>Order history</h5>
        {
          orders ?
            <>
             {orders.map((item)=>{
              return <div className='row border-bottom border-3 border-secondary' key={item.id}>
                <div className='col-md-4'>
                  <div className="table-responsive">
                    <table className='table table-bodered table-striped table-hover'>
                      <tbody>
                        <tr> 
                          <th>Order id</th>
                          <td>{item._id}</td>
                        </tr>
                        <tr> 
                          <th>Order Status</th>
                          <td>{item.OrderStatus}</td>
                        </tr>
                        <tr> 
                          <th>Payment Mode</th>
                          <td>{item.PaymentMode}</td>
                        </tr>
                        <tr> 
                          <th>Payment Status</th>
                          <td>{item.PaymentStatus}</td>
                        </tr>
                        <tr> 
                          <th>Subtotal</th>
                          <td>{item.subtotal}</td>
                        </tr>
                        <tr> 
                          <th>Shipping</th>
                          <td>{item.shipping}</td>
                        </tr>
                        <tr> 
                          <th>Total</th>
                          <td>{item.total}</td>
                        </tr>
                        <tr> 
                          <th>Date</th>
                          <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-md-8 mt-2'>
                  <Cart title="Products in order" data={item.product}/>
                </div>
              </div>
             })}
            </> : <div className='justify-content-center'><h5 className='text-center w-100 text-danger'>No Any Order History</h5>
              <Link to="/shop" className='btn btn-primary text-center w-10 my-2 ms-6'> Shop Now</Link></div>
        }
      </div>
    </>
  )
}
