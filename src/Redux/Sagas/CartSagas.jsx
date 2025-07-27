import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield createRecord("cart", action.payload)
    yield put({ type: CREATE_CART_RED, payload: responce })
    // let responce = yield createmultipathRecord("cart")
    // yield put({ type: CREATE_CART_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("cart", action.payload)
    yield put({ type: GET_CART_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("cart", action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("cart", action.payload)
    // yield put({ type: UPDATE_CREATE_CART_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}
export default function* cartSagas() {
    yield takeEvery(CREATE_CART, createSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)

}