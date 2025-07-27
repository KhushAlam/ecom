import { CREATE_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS } from "../Constent";

export function Createusers(data) {
    return {
        type: CREATE_USERS,
        payload: data
    }
}
export function getusers() {
    return {
        type: GET_USERS,
    }
}
export function updateusers(data) {
    return {
        type: UPDATE_USERS,
        payload: data
    }
}
export function deleteusers(data) {
    return {
        type: DELETE_USERS,
        payload: data
    }
}
