import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletecart, getcart, updatecart } from "./../Redux/ActionCreator/CartActionCreator"
import { Createcheckout } from './../Redux/ActionCreator/CheckOutActionCreator';
import { getproduct, updateproduct } from './../Redux/ActionCreator/ProductActionCreator';

export default function Cart({ title, data }) {
    let [cartdata, setcartdata] = useState(data ? data : []);
    let [total, settotal] = useState(0);
    let [subtotal, setsubtotal] = useState(0);
    let [shipping, setshippin] = useState(0);
    let [mode, setmode] = useState("COD")

    let cartstatedata = useSelector(state => state.cartstatedata);
    let productstatedata = useSelector(state => state.productstatedata)
    let dispatch = useDispatch();
    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            OrderStatus: "Order is Placed",
            PaymentMode: mode,
            PaymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            product: cartdata.map(c => ({
            productId: c.product,
            quantity: c.quentity
        }))
        }
        const Fromdata =new FormData()
        Object.keys(item).forEach(key => {
            if (key === "product") {
                Fromdata.append(key, JSON.stringify(item[key])); // <--- stringify here
            } else {
                Fromdata.append(key, item[key]);
            }
        });

        dispatch(Createcheckout(Fromdata))

        cartdata.forEach(cartItem => {
            let product = productstatedata.find(x => x._id === cartItem.product)
            product.stockQuantity = product.stockQuantity - cartItem.quentity
            product.stock = product.stockQuantity === 0 ? false : true

            const Fromdata = new FormData()
            Object.keys(product).forEach(key =>
                Fromdata.append(key, product[key])
            )
            dispatch(updateproduct(Fromdata))
            // dispatch(deletecart({ id: cartItem._id }))
            const deletecartItem = new FormData()
            Object.keys(cartItem).forEach(key =>
                deletecartItem.append(key, cartItem[key])
            )
            dispatch(deletecart(deletecartItem))

        })
        navigate("/order-confirmation");

    }
    function deletehandle(id) {
        if (window.confirm("Are you Sure to delete")) {
            dispatch(deletecart({ id: id }))
            cartapidata()
        }
    }


    function updaterecord(id, option) {
        let item = cartdata.find(x => x._id === id)
        let index = cartdata.findIndex(x => x._id === id)
        if ((option === "DEC" && item.quentity === 1) || (option === "INC" && item.quentity === item.stockQuantity)) {

        } else if (option === "DEC") {
            item.quentity = item.quentity - 1;
            item.total = item.total - item.price
        } else {
            item.quentity = item.quentity + 1;
            item.total = item.total + item.price
        }
        dispatch(updatecart({ ...item }))
        cartdata[index].quentity = item.quentity
        cartdata[index].total = item.total
        calculation(cartdata)
    }
    function calculation(data) {
        let subtotal = 0;
        data.forEach(x => subtotal = subtotal + x.total)
        if (subtotal > 0 && subtotal < 1000) {
            settotal(subtotal + 150);
            setshippin(150)
        }
        else {
            settotal(subtotal);
            setshippin(0)
        }
        setsubtotal(subtotal)
    }

    function cartapidata() {
        dispatch(getcart())
        if (data) {
            calculation(data)
        }
        else if (cartstatedata) {
            let data = cartstatedata.filter(x => x.user === localStorage.getItem("userid"))
            setcartdata(data)
            calculation(data)
        } else {
            setcartdata([])
            // calculation(subtotal)
        }

    }

    useEffect(() => {
        cartapidata()
    }, [])

    useEffect(() => {
        (() => {
            dispatch(getproduct())
        })()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <h4 className='text-light text-center p-1 bg-primary w-100'>{title} Section</h4>
                {
                    cartdata ?
                        <>
                            <div className="table-responsive">
                                <table className='table table-bordered table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th className={`${title === "Checkout" ? "d-none" : ''}`}>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th className={`${title === "Checkout" ? "d-none" : ''}`}>Stock</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartdata.map((item) => {
                                                return <tr key={item._id}>
                                                    <td><Link to={`${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${item.pic}`} height={50} width={80} /></Link></td>
                                                    <td>{item.name}</td>
                                                    <td className={`${title === "Checkout" ? "d-none" : ''}`}>{item.brand}</td>
                                                    <td>{item.color}</td>
                                                    <td>{item.size}</td>
                                                    <td className={`${title === "Checkout" ? "d-none" : ''}`} >{item.stockQuentity ? `${item.stockQuentity} Product Are left` : "Out of Stock"}</td>
                                                    <td>&#8377;{item.price}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <div className={` ${title === 'Checkout' || title === "Products in order" ? '' : "btn btn-primary"}`}><i className={`fa fa-minus ${title === "Checkout" || title === "Products in order" ? "d-none" : ''}`} onClick={() => { updaterecord(item._id, "DEC") }}></i></div>
                                                            <h4 className='text-center ms-3 me-3 w-50'>{item.quentity}</h4>
                                                            <div className={` ${title === 'Checkout' || title === "Products in order" ? '' : "btn btn-primary"}`}><i className={`fa fa-plus ${title === "Checkout" || title === "Products in order" ? "d-none" : ''}`} onClick={() => { updaterecord(item._id, "INC") }}></i></div>
                                                        </div>
                                                    </td>
                                                    <td>&#8377;{item.total}</td>
                                                    <td className={`${title !== "Cart" ? "d-none" : ""}`}><button className={`btn btn-danger ${title === 'Checkout' ? 'd-none' : ""}`} onClick={() => { deletehandle(item._id) }} ><i className={`fa fa-trash fs-5 b text-light ${title === "Checkout" ? "d-none" : ''}`}></i></button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className={`row ${title === 'Products in order' ? "d-none" : ""}`}>
                                    <div className="col-md-5"></div>
                                    <div className="col-md-7">
                                        <table className='table table-bordered table-striped table-hover'>
                                            <tbody>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>&#8377;{subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>&#8377;{shipping}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>&#8377;{total}</td>
                                                </tr>
                                                <tr className={`${title !== 'Checkout' ? "d-none" : ""}`}>
                                                    <th>Payment Mode</th>
                                                    <td ><select name="payment" className={`form-control w-100 border-3 border-primary form-select`} onChange={(e) => { setmode(e.target.value) }}>
                                                        <option value="COD">COD</option>
                                                        <option value="NetBanking" disabled>Net Banking/Card/Upi</option>
                                                    </select></td>
                                                </tr>
                                                <tr>
                                                    {
                                                        title === "Checkout" ?
                                                            <>
                                                                <th></th>
                                                                <td><button className='btn btn-primary w-100' onClick={placeOrder} >Place Order</button ></td>
                                                            </> :
                                                            <>
                                                                <th><Link to={"/checkout"} className='btn btn-primary w-50' >Proceed To Checkout</Link ></th>

                                                            </>
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </> : <div className='justify-content-center'><h5 className='text-center w-100 text-danger'>No item in Wishlist</h5>
                            <Link to="/shop" className='btn btn-primary text-center w-10 my-2 ms-6'> Shop Now</Link></div>
                }
            </div>
        </>
    )
}
