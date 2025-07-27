import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield createRecord("product",action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: responce })

    // let responce = yield createmultipathRecord("product")
    // yield put({ type: CREATE_PRODUCT_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("product", action.payload)
    yield put({ type: GET_PRODUCT_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("product", action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("product", action.payload)
    // yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}
export default function* productSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)

}