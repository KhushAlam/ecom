import { CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constent";
export default function CheckoutReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CHECKOUT_RED:
            return [...state, action.payload]
        case GET_CHECKOUT_RED:
            return action.payload.data

        case UPDATE_CHECKOUT_RED:
            return state.map(x=>
                x._id===action.payload._id?{...x,...action.payload}:x
            )

        case DELETE_CHECKOUT_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}