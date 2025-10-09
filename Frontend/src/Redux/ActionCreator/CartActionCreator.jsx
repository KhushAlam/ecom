import { CREATE_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../Constent";

export function createcart(data) {
    return {
        type: CREATE_CART,
        payload: data
    }
}
export function getcart() {
    return {
        type: GET_CART,
    }
}
export function updatecart(data) {
    return {
        type: UPDATE_CART,
        payload: data
    }
}
export function deletecart(data) {
    return {
        type: DELETE_CART,
        payload: data
    }
}
