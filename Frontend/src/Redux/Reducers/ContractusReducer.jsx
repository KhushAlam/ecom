import { CREATE_CONTRACTUS_RED, DELETE_CONTRACTUS_RED, GET_CONTRACTUS_RED, UPDATE_CONTRACTUS_RED } from "../Constent";
export default function ContractusReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CONTRACTUS_RED:
            return [...state, action.payload]
        case GET_CONTRACTUS_RED:
            return action.payload.data

        case UPDATE_CONTRACTUS_RED:
            return state.map(x =>
                x._id === action.payload._id ? { ...x, ...action.payload } : x
            )

        case DELETE_CONTRACTUS_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}