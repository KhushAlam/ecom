import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield createRecord("brand",action.payload)
    yield put({ type: CREATE_BRAND_RED, payload: responce })

    // let responce = yield createmultipathRecord("brand")
    // yield put({ type: CREATE_BRAND_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("brand", action.payload)
    yield put({ type: GET_BRAND_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("brand", action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("brand", action.payload)
    // yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("brand", action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}
export default function* brandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)

}