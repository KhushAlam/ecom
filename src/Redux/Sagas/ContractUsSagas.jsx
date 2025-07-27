import { CREATE_CONTRACTUS, CREATE_CONTRACTUS_RED, DELETE_CONTRACTUS, DELETE_CONTRACTUS_RED, GET_CONTRACTUS, GET_CONTRACTUS_RED, UPDATE_CONTRACTUS, UPDATE_CONTRACTUS_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield createRecord("contactus",action.payload)
    yield put({ type: CREATE_CONTRACTUS_RED, payload: responce })

    // let responce = yield createmultipathRecord("contractus")
    // yield put({ type: CREATE_CONTRACTUS_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("contactus", action.payload)
    yield put({ type: GET_CONTRACTUS_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTRACTUS_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("contractus", action.payload)
    // yield put({ type: UPDATE_CONTRACTUS_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTRACTUS_RED, payload: action.payload })
}
export default function* contractusSagas() {
    yield takeEvery(CREATE_CONTRACTUS, createSaga)
    yield takeEvery(GET_CONTRACTUS, getSaga)
    yield takeEvery(UPDATE_CONTRACTUS, updateSaga)
    yield takeEvery(DELETE_CONTRACTUS, deleteSaga)

}