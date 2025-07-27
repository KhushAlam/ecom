import { CREATE_TESTIMONIAL, DELETE_TESTIMONIAL, GET_TESTIMONIAL, UPDATE_TESTIMONIAL } from "../Constent";

export function Createtestimonial(data) {
    return {
        type: CREATE_TESTIMONIAL,
        payload: data
    }
}
export function gettestimonial() {
    return {
        type: GET_TESTIMONIAL,
    }
}
export function updatetestimonial(data) {
    return {
        type: UPDATE_TESTIMONIAL,
        payload: data
    }
}
export function deletetestimonial(data) {
    return {
        type: DELETE_TESTIMONIAL,
        payload: data
    }
}
