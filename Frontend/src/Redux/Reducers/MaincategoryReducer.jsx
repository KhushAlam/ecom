import { CREATE_MAINCTEGORY_RED, DELETE_MAINCTEGORY_RED, GET_MAINCTEGORY_RED, UPDATE_MAINCTEGORY_RED } from "../Constent";
export default function maincategoryReducer(state = [], action) {
    switch (action.type) {
        case CREATE_MAINCTEGORY_RED:
            return [...state, action.payload]
        case GET_MAINCTEGORY_RED:
            return action.payload.data

        case UPDATE_MAINCTEGORY_RED:
            return state.map((x) =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            );
        case DELETE_MAINCTEGORY_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}