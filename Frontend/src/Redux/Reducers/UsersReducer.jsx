import { CREATE_USERS_RED, DELETE_USERS_RED, GET_USERS_RED, UPDATE_USERS_RED } from "../Constent";
export default function usersReducer(state = [], action) {
    switch (action.type) {
        case CREATE_USERS_RED:
            return [...state, action.payload]
        case GET_USERS_RED:
            return action.payload.data

        case UPDATE_USERS_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x)

        case DELETE_USERS_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}