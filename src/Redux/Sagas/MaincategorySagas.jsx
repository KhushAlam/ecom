import { CREATE_MAINCTEGORY, CREATE_MAINCTEGORY_RED, DELETE_MAINCTEGORY, DELETE_MAINCTEGORY_RED, GET_MAINCTEGORY, GET_MAINCTEGORY_RED, UPDATE_MAINCTEGORY, UPDATE_MAINCTEGORY_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "admin/maincategory", action.payload)
    yield put({ type: CREATE_MAINCTEGORY_RED, payload: responce })

    // let responce = yield createmultipathRecord("maincategory")
    // yield put({ type: CREATE_MAINCTEGORY_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "admin/maincategory", action.payload)
    yield put({ type: GET_MAINCTEGORY_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "admin/maincategory", action.payload)
    yield put({ type: UPDATE_MAINCTEGORY_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("maincategory", action.payload)
    // yield put({ type: UPDATE_MAINCTEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "admin/maincategory", action.payload)
    yield put({ type: DELETE_MAINCTEGORY_RED, payload: action.payload })
}
export default function* maincategorySagas() {
    yield takeEvery(CREATE_MAINCTEGORY, createSaga)
    yield takeEvery(GET_MAINCTEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCTEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCTEGORY, deleteSaga)

}