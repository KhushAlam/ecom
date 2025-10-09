import { combineReducers } from "redux";
import maincategoryReducer from "./MaincategoryReducer";
import subcategoryReducer from "./SubcategoryReducer";
import productReducer from "./ProductReducer";
import brandReducer from "./BrandReducer";
import testimonialReducer from "./TestimonialReducer";
import ContractusReducer from "./ContractusReducer";
import NewslatterReducer from "./NewslatterReducer";
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import CartReducer from "./CartReducer";
import usersReducer from "./UsersReducer";



export default combineReducers({
    maincategorystatedata: maincategoryReducer,
    subcategorystatedata: subcategoryReducer,
    productstatedata: productReducer,
    brandstatedata: brandReducer,
    testimonialstatedata: testimonialReducer,
    contractusstatedata: ContractusReducer,
    newslatterstatedata: NewslatterReducer,
    wishliststatedata: WishlistReducer,
    checkoutstatedata: CheckoutReducer,
    cartstatedata: CartReducer,
    userstatedata: usersReducer
}) 