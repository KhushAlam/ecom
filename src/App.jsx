import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Pages/Homepage";
import AboutPages from "./Pages/AboutPages";
import ShopPage from "./Pages/ShopPage";
import FeaturesPage from "./Pages/FeaturesPage";
import ContractUsPage from "./Pages/ContractUsPage";
import TestomonialPage from "./Pages/TestomonialPage";
import Adminhome from "./Pages/Admin/Adminhome";
import Adminmaincategory from "./Pages/Admin/Maincategory/Adminmaincategory";
import Adminmaincategorycreate from "./Pages/Admin/Maincategory/Adminmaincategorycreate";
import Adminmaincategoryupdate from "./Pages/Admin/Maincategory/Adminmaincategoryupdate";

import Adminsubcategory from "./Pages/Admin/Subcategory/Adminsubcategory";
import Adminsubcategorycreate from "./Pages/Admin/Subcategory/Adminsubcategorycreate";
import Adminsubcategoryupdate from "./Pages/Admin/Subcategory/Adminsubcategoryupdate";

import Adminbrand from "./Pages/Admin/Brand/Adminbrand";
import Admincreatebrand from "./Pages/Admin/Brand/Admincreatebrand";
import Adminupdatebrand from "./Pages/Admin/Brand/Adminupdatebrand";

import Adminproduct from "./Pages/Admin/Product/Adminproduct";
import AdmincreateProduct from "./Pages/Admin/Product/AdmincreateProduct";
import AdminupdateProduct from "./Pages/Admin/Product/AdminupdateProduct";

import AdminTestimonial from "./Pages/Admin/Testimonial/AdminTestimonial";
import AdminupdateTestimonial from "./Pages/Admin/Testimonial/AdminupdateTestimonial";
import AdmincreateTestimonial from "./Pages/Admin/Testimonial/AdmincreateTestimonial";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UserProfile from "./Pages/UserProfile";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Adminnewslatter from "./Pages/Admin/Newslatter/AdminNewslatter";
import Admincontactus from "./Pages/Admin/Contactus/AdminContactus";
import Admincontactusshow from "./Pages/Admin/Contactus/AdminContactusshow";
import AdminCheckout from "./Pages/Admin/Checkout/AdminCheckout";
import AdminCheckoutshow from "./Pages/Admin/Checkout/AdminCheckoutshow";
import Adminusers from "./Pages/Admin/Users/Adminusers"
import Admincreateusers from "./Pages/Admin/Users/Admincreateusers";
import Adminupdateusers from "./Pages/Admin/Users/Adminupdateusers";
import ErrorPage from "./Pages/ErrorPage";
import Forgetpassword from "./Components/Forgetpassword";



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/About" element={<AboutPages />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/testomonial" element={<TestomonialPage />} />
          <Route path="/contractus" element={<ContractUsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-password" element={<Forgetpassword />} />

          {/* Buyer Route */}
          {localStorage.getItem("login") === "true" ? <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} /></> : null}

          {/* Admin routes */}
          {/* {localStorage.getItem("login") && (localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Super Admin") */}
            {/* ? */}
            {/* <> */}
              <Route path="/admin" element={<Adminhome />} />
              <Route path="/admin/maincategory" element={<Adminmaincategory />} />
              <Route path="/admin/maincategory/create" element={<Adminmaincategorycreate />} />
              <Route path="/admin/maincategory/update/:id" element={<Adminmaincategoryupdate />} />

              <Route path="/admin/subcategory" element={<Adminsubcategory />} />
              <Route path="/admin/subcategory/create" element={<Adminsubcategorycreate />} />
              <Route path="/admin/subcategory/update/:id" element={<Adminsubcategoryupdate />} />

              <Route path="/admin/brand" element={<Adminbrand />} />
              <Route path="/admin/brand/create" element={<Admincreatebrand />} />
              <Route path="/admin/brand/update/:id" element={<Adminupdatebrand />} />

              <Route path="/admin/product" element={<Adminproduct />} />
              <Route path="/admin/product/create" element={<AdmincreateProduct />} />
              <Route path="/admin/product/update/:id" element={<AdminupdateProduct />} />

              <Route path="/admin/testimonial" element={<AdminTestimonial />} />
              <Route path="/admin/testimonial/create" element={<AdmincreateTestimonial />} />
              <Route path="/admin/testimonial/update/:id" element={<AdminupdateTestimonial />} />

              <Route path="/admin/newslatter" element={<Adminnewslatter />}></Route>

              <Route path="/admin/contactus" element={<Admincontactus />}></Route>
              <Route path="/admin/contactus/:id" element={<Admincontactusshow />}></Route>

              <Route path="/admin/checkout" element={<AdminCheckout />}></Route>
              <Route path="/admin/checkout/:id" element={<AdminCheckoutshow />}></Route>


              <Route path="/admin/user" element={<Adminusers />} />
              <Route path="/admin/user/create" element={<Admincreateusers />} />
              <Route path="/admin/user/update/:id" element={<Adminupdateusers />} />
              {/* </> : null} */}

          <Route path="/*" element={<ErrorPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
