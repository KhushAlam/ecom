import { CREATE_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED } from "../Constent";
export default function productReducer(state=[], action) {
    switch (action.type) {
        case CREATE_PRODUCT_RED:
            return [...state, action.payload]
        case GET_PRODUCT_RED:
            return action.payload.data

        case UPDATE_PRODUCT_RED:
            return state.map(x=>
                x._id===action.payload._id?{...x,...action.payload}:x
            )

        case DELETE_PRODUCT_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}