import { CREATE_SUBCTEGORY_RED, DELETE_SUBCTEGORY_RED, GET_SUBCTEGORY_RED, UPDATE_SUBCTEGORY_RED } from "../Constent";
export default function subcategoryReducer(state = [], action) {
    switch (action.type) {
        case CREATE_SUBCTEGORY_RED:
            return [...state, action.payload]
        case GET_SUBCTEGORY_RED:
            return action.payload.data

        case UPDATE_SUBCTEGORY_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_SUBCTEGORY_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}