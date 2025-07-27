import { CREATE_SUBCTEGORY, DELETE_SUBCTEGORY, GET_SUBCTEGORY, UPDATE_SUBCTEGORY } from "../Constent";

export function Createsubcategory(data) {
    return {
        type: CREATE_SUBCTEGORY,
        payload: data
    }
}
export function getsubcategory() {
    return {
        type: GET_SUBCTEGORY,
    }
}
export function updatesubcategory(data) {
    return {
        type: UPDATE_SUBCTEGORY,
        payload: data
    }
}
export function deletesubcategory(data) {
    return {
        type: DELETE_SUBCTEGORY,
        payload: data
    }
}
