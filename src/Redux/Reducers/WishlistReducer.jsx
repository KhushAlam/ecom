import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED } from "../Constent";
export default function WishlistReducer(state = [], action) {
    switch (action.type) {
        case CREATE_WISHLIST_RED:
            return [...state, action.payload]
        case GET_WISHLIST_RED:
            return action.payload

        case DELETE_WISHLIST_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}