import { CREATE_NEWSLATTER_RED, DELETE_NEWSLATTER_RED, GET_NEWSLATTER_RED, UPDATE_NEWSLATTER_RED } from "../Constent";
export default function NewslatterReducer(state = [], action) {
    switch (action.type) {
        case CREATE_NEWSLATTER_RED:
            return [...state, action.payload]
        case GET_NEWSLATTER_RED:
            return action.payload

        case UPDATE_NEWSLATTER_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].active = action.payload.active
            return state

        case DELETE_NEWSLATTER_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}