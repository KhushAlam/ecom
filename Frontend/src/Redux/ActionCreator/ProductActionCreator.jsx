import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../Constent";

export function Createproduct(data) {
    return {
        type: CREATE_PRODUCT,
        payload: data
    }
}
export function getproduct() {
    return {
        type: GET_PRODUCT,
    }
}
export function updateproduct(data) {
    return {
        type: UPDATE_PRODUCT,
        payload: data
    }
}
export function deleteproduct(data) {
    return {
        type: DELETE_PRODUCT,
        payload: data
    }
}
