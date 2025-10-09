import { CREATE_NEWSLATTER, DELETE_NEWSLATTER, GET_NEWSLATTER, UPDATE_NEWSLATTER } from "../Constent";

export function CreateNewslatter(data) {
    return {
        type: CREATE_NEWSLATTER,
        payload: data
    }
}
export function getNewslatter() {
    return {
        type: GET_NEWSLATTER,
    }
}
export function updateNewslatter(data) {
    return {
        type: UPDATE_NEWSLATTER,
        payload: data
    }
}
export function deleteNewslatter(data) {
    return {
        type: DELETE_NEWSLATTER,
        payload: data
    }
}
