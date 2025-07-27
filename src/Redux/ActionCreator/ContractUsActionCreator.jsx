import { CREATE_CONTRACTUS, DELETE_CONTRACTUS, GET_CONTRACTUS, UPDATE_CONTRACTUS } from "../Constent";

export function createcontractus(data) {
    return {
        type: CREATE_CONTRACTUS,
        payload: data
    }
}
export function getcontractus() {
    return {
        type: GET_CONTRACTUS,
    }
}
export function updatecontractus(data) {
    return {
        type: UPDATE_CONTRACTUS,
        payload: data
    }
}
export function deletecontractus(data) {
    return {
        type: DELETE_CONTRACTUS,
        payload: data
    }
}
