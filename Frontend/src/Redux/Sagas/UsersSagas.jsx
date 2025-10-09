import { CREATE_USERS, CREATE_USERS_RED, DELETE_USERS, DELETE_USERS_RED, GET_USERS, GET_USERS_RED, UPDATE_USERS, UPDATE_USERS_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "user", action.payload)
    yield put({ type: CREATE_USERS_RED, payload: responce })

    // let responce = yield createmultipathRecord("user")
    // yield put({ type: CREATE_USERS_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "user", action.payload)
    yield put({ type: GET_USERS_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "user", action.payload)
    yield put({ type: UPDATE_USERS_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("user", action.payload)
    // yield put({ type: UPDATE_USERS_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "user", action.payload)
    yield put({ type: DELETE_USERS_RED, payload: action.payload })
}
export default function* usersSagas() {
    yield takeEvery(CREATE_USERS, createSaga)
    yield takeEvery(GET_USERS, getSaga)
    yield takeEvery(UPDATE_USERS, updateSaga)
    yield takeEvery(DELETE_USERS, deleteSaga)

}