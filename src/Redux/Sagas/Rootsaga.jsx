import { all } from "redux-saga/effects";

import maincategorySagas from "./MaincategorySagas";
import subcategorySagas from "./SubcategorySagas";
import productSagas from "./ProductSagas";
import testimonialSagas from "./TestimonialSagas";
import brandSagas from "./BrandSagas";
import checkoutSagas from "./CheckOutSagas"
import cartSagas from "./CartSagas";
import wishlistSagas from "./WishlistSagas";
import newslatterSagas from "./NewsLatterSagas";
import contractusSagas from "./ContractUsSagas";
import usersSagas from "./UsersSagas";

export default function* RootSagas() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        productSagas(),
        testimonialSagas(),
        brandSagas(),
        cartSagas(),
        checkoutSagas(),
        wishlistSagas(),
        newslatterSagas(),
        contractusSagas(),
        usersSagas(),
    ])
}