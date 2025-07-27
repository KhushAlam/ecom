import { CREATE_CONTRACTUS_RED, DELETE_CONTRACTUS_RED, GET_CONTRACTUS_RED, UPDATE_CONTRACTUS_RED } from "../Constent";
export default function ContractusReducer(state=[], action) {
    switch (action.type) {
        case CREATE_CONTRACTUS_RED:
            return [...state, action.payload]
        case GET_CONTRACTUS_RED:
            return action.payload

        case UPDATE_CONTRACTUS_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].active = action.payload.active
            return state

        case DELETE_CONTRACTUS_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}