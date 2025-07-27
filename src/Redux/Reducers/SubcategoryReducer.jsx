import { CREATE_SUBCTEGORY_RED, DELETE_SUBCTEGORY_RED, GET_SUBCTEGORY_RED, UPDATE_SUBCTEGORY_RED } from "../Constent";
export default function subcategoryReducer(state=[], action) {
    switch (action.type) {
        case CREATE_SUBCTEGORY_RED:
            return [...state, action.payload]
        case GET_SUBCTEGORY_RED:
            return action.payload

        case UPDATE_SUBCTEGORY_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_SUBCTEGORY_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}