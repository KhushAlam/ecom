import { CREATE_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constent";
export default function CartReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CART_RED:
            return [...state, action.payload]
        case GET_CART_RED:
            return action.payload.data

        case UPDATE_CART_RED:
            return state.map(x =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            )

        case DELETE_CART_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}