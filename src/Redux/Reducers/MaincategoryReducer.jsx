import { CREATE_MAINCTEGORY_RED, DELETE_MAINCTEGORY_RED, GET_MAINCTEGORY_RED, UPDATE_MAINCTEGORY_RED } from "../Constent";
export default function maincategoryReducer(state=[], action) {
    switch (action.type) {
        case CREATE_MAINCTEGORY_RED:
            return [...state, action.payload]
        case GET_MAINCTEGORY_RED:
            return action.payload

        case UPDATE_MAINCTEGORY_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_MAINCTEGORY_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}