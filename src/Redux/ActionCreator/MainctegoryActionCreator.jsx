import { CREATE_MAINCTEGORY, DELETE_MAINCTEGORY, GET_MAINCTEGORY, UPDATE_MAINCTEGORY } from "../Constent";

export function Createmaincategory(data) {
    return {
        type: CREATE_MAINCTEGORY,
        payload: data
    }
}
export function getmaincategory() {
    return {
        type: GET_MAINCTEGORY,
    }
}
export function updatemaincategory(data) {
    return {
        type: UPDATE_MAINCTEGORY,
        payload: data
    }
}
export function deletemaincategory(data) {
    return {
        type: DELETE_MAINCTEGORY,
        payload: data
    }
}
