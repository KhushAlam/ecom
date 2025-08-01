import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constent";
export default function testimonialReducer(state=[], action) {
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED:
            return [...state, action.payload]
        case GET_TESTIMONIAL_RED:
            return action.payload

        case UPDATE_TESTIMONIAL_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_TESTIMONIAL_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}