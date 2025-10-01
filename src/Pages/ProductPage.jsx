import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from "./../Redux/ActionCreator/ProductActionCreator";
import { getcart, createcart } from "./../Redux/ActionCreator/CartActionCreator";
import { Createwishlist, getwishlist } from "./../Redux/ActionCreator/WishListActionCreator";
import ProductSlider from '../Components/ProductSlider';

export default function ProductPage() {
    let { id } = useParams();
    let [product, setproduct] = useState({ pic: [] });
    let [quentity, setquentity] = useState(1)
    let [relatedproduct, setrelatedproduct] = useState([])

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let productstatedata = useSelector(state => state.productstatedata)
    let cartstatedata = useSelector(state => state.cartstatedata)
    let wishliststatedata = useSelector(state => state.wishliststatedata)

    useEffect(() => {
        dispatch(getproduct());
    }, [id]);

    useEffect(() => {
        if (productstatedata) {
            let item = productstatedata.find((x) => x._id === id);
            if (item) {
                setproduct(item);
                setrelatedproduct(productstatedata.filter(x => x.maincategory === item.maincategory && x._id !== item._id));
            }
        }
    }, []);

    useEffect(() => {
        dispatch(getcart())
    }, [])

    useEffect(() => {
        dispatch(getwishlist())
    }, [])

    function addtocart() {
        let item = cartstatedata.find((x) => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                product: id,
                user: localStorage.getItem("userid"),
                quentity: quentity,
                total: quentity * product.finalPrice,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalPrice,
                stockQuantity: product.stockQuantity,
                pic: product.pic[0],

            }
            dispatch(createcart(item))
        }
        navigate("/cart")
    }

    function addtowishlist() {

        let item = wishliststatedata.find((x) => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                product: id,
                user: localStorage.getItem("userid"),
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalPrice,
                stockQuantity: product.stockQuantity,
                pic: product.pic[0],
            }

            dispatch(Createwishlist(item))
        }
        navigate("/profile")
    }


    return (
        <>
            <Breadcrum title={product.name ? product.name : ""} />

            <div className="container-fluid mt-3">

                <div className="row">
                    <div className="col-md-6">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                {
                                    product?.pic?.map((item, index) => {
                                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? "active" : ""}`} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                    })
                                }

                            </div>
                            <div className="carousel-inner">
                                {product.pic?.map((item, index) => {
                                    return <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={`${item}`} height={450} className="d-block w-100" alt="item pic" />
                                    </div>
                                })}

                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="table-responsive">
                            <div className="my-2 d-flex justify-content-between" >
                                {
                                    product.pic.map((item, index) => {
                                        return <img key={index} src={`${item}`} height={100} width={100} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className='me-1 ' />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary p-2 text-light text-center'>{product.name}</h5>
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Category</th>
                                    <td>{product.maincategory}/{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock ? product.stockQuantity + " " + "Are left" : "Out of Stock"}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{product.basePrice}</del> &#8377;{product.finalPrice} <sup>{product.disCount} % Off</sup></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {product.stock ? <div className="row">
                                            <div className="col-5 col-sm-4 col-md-3">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary' onClick={() => quentity > 1 ? setquentity(quentity - 1) : null}><i className='fa fa-minus'></i></button>
                                                    <h4 className='w-50 text-center'>{quentity}</h4>
                                                    <button className='btn btn-primary' onClick={() => quentity < product.stockQuantity ? setquentity(quentity + 1) : null}><i className='fa fa-plus'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-7 col-sm-8 col-md-9">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary w-50' onClick={addtocart}><i className='fa fa-shopping-cart'></i>Add to cart</button>
                                                    <button className='btn btn-secondary w-50' onClick={addtowishlist}><i className='fa fa-heart'></i>Wishlist</button>
                                                </div>
                                            </div>
                                        </div> : <button className='btn btn-secondary w-100' onClick={addtowishlist}><i className='fa fa-heart'></i>Wishlist</button>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><div dangerouslySetInnerHTML={{ __html: product.discription }}></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProductSlider tittle='Related Product' data={relatedproduct} />

            </div>
        </>
    )
}
