import { CREATE_NEWSLATTER_RED, DELETE_NEWSLATTER_RED, GET_NEWSLATTER_RED, UPDATE_NEWSLATTER_RED } from "../Constent";
export default function NewslatterReducer(state = [], action) {
    switch (action.type) {
        case CREATE_NEWSLATTER_RED:
            return [...state, action.payload]
        case GET_NEWSLATTER_RED:
            return action.payload.data

        case UPDATE_NEWSLATTER_RED:
             return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_NEWSLATTER_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}