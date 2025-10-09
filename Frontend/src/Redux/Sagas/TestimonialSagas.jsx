import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "admin/testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: responce })

    // let responce = yield createmultipathRecord("testimonial")
    // yield put({ type: CREATE_TESTIMONIAL_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "admin/testimonial", action.payload)
    yield put({ type: GET_TESTIMONIAL_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "admin/testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("testimonial", action.payload)
    // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "admin/testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}
export default function* testimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)

}