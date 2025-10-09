import { CREATE_NEWSLATTER, CREATE_NEWSLATTER_RED, DELETE_NEWSLATTER, DELETE_NEWSLATTER_RED, GET_NEWSLATTER, GET_NEWSLATTER_RED, UPDATE_NEWSLATTER, UPDATE_NEWSLATTER_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "admin/newslatter", action.payload)
    yield put({ type: CREATE_NEWSLATTER_RED, payload: responce })

}

function* getSaga(action) {
    let responce = yield call(getRecord, "admin/newslatter", action.payload)
    yield put({ type: GET_NEWSLATTER_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "admin/newslatter", action.payload)
    yield put({ type: UPDATE_NEWSLATTER_RED, payload: action.payload })

}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "admin/newslatter", action.payload)
    yield put({ type: DELETE_NEWSLATTER_RED, payload: action.payload })
}
export default function* newslatterSagas() {
    yield takeEvery(CREATE_NEWSLATTER, createSaga)
    yield takeEvery(GET_NEWSLATTER, getSaga)
    yield takeEvery(UPDATE_NEWSLATTER, updateSaga)
    yield takeEvery(DELETE_NEWSLATTER, deleteSaga)

}