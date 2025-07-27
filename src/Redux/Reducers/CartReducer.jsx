import { CREATE_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constent";
export default function CartReducer(state=[], action) {
    switch (action.type) {
        case CREATE_CART_RED:
            return [...state, action.payload]
        case GET_CART_RED:
            return action.payload

        case UPDATE_CART_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].qty = action.payload.qty
            state[index].total = action.payload.total
            state[index].active = action.payload.active
            return state

        case DELETE_CART_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}