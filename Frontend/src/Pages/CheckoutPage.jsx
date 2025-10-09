import React from 'react'
import Breadcrum from "./../Components/Breadcrum"
import Cart from '../Components/Cart'
import Profile from "./../Components/Profile"


export default function CheckoutPage() {
  return (
    <>
      <Breadcrum title="Checkout " />
      <div className="container-fluid my-2">
        <div className="row ">
          <div className="col-md-5">
          <Profile title="Billing" />
        </div>
        <div className="col-md-7">
          <Cart title="Checkout" />
          </div>
        </div>
      </div>
    </>
  )
}
