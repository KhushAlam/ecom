import { CREATE_BRAND, DELETE_BRAND, GET_BRAND, UPDATE_BRAND } from "../Constent";

export function Createbrand(data) {
    return {
        type: CREATE_BRAND,
        payload: data
    }
}
export function getbrand() {
    return {
        type: GET_BRAND,
    }
}
export function updatebrand(data) {
    return {
        type: UPDATE_BRAND,
        payload: data
    }
}
export function deletebrand(data) {
    return {
        type: DELETE_BRAND,
        payload: data
    }
}
