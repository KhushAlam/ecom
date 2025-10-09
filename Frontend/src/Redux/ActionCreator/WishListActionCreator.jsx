import { CREATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST } from "../Constent";

export function Createwishlist(data) {
    return {
        type: CREATE_WISHLIST,
        payload: data
    }
}
export function getwishlist() {
    return {
        type: GET_WISHLIST,
    }
}
export function deletewishlist(data) {
    return {
        type: DELETE_WISHLIST,
        payload: data
    }
}
