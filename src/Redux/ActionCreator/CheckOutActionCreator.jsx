import { CREATE_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT } from "../Constent";

export function Createcheckout(data) {
    return {
        type: CREATE_CHECKOUT,
        payload: data
    }
}
export function getcheckout() {
    return {
        type: GET_CHECKOUT,
    }
}
export function updatecheckout(data) {
    return {
        type: UPDATE_CHECKOUT,
        payload: data
    }
}
export function deletecheckout(data) {
    return {
        type: DELETE_CHECKOUT,
        payload: data
    }
}
