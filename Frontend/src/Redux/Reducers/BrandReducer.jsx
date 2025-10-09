import { CREATE_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED } from "../Constent";
export default function brandReducer(state=[], action) {
    switch (action.type) {
        case CREATE_BRAND_RED:
            return [...state, action.payload]
        case GET_BRAND_RED:
            return action.payload.data
        case UPDATE_BRAND_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );

        case DELETE_BRAND_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}