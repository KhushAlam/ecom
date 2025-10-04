import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "checkout", action.payload)
    yield put({ type: CREATE_CHECKOUT_RED, payload: responce })

    // let responce = yield createmultipathRecord("checkout")
    // yield put({ type: CREATE_CHECKOUT_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "checkout", action.payload)
    yield put({ type: GET_CHECKOUT_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "checkout", action.payload);
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("checkout", action.payload)
    // yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}
export default function* checkoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)

}