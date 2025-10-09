import { CREATE_SUBCTEGORY, CREATE_SUBCTEGORY_RED, DELETE_SUBCTEGORY, DELETE_SUBCTEGORY_RED, GET_SUBCTEGORY, GET_SUBCTEGORY_RED, UPDATE_SUBCTEGORY, UPDATE_SUBCTEGORY_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "admin/subcategory", action.payload)
    yield put({ type: CREATE_SUBCTEGORY_RED, payload: responce })

    // let responce = yield createmultipathRecord("maincategory")
    // yield put({ type: CREATE_SUBCTEGORY_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "admin/subcategory", action.payload)
    yield put({ type: GET_SUBCTEGORY_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "admin/subcategory", action.payload)
    yield put({ type: UPDATE_SUBCTEGORY_RED, payload: action.payload })

    // let responce = yield updatemultiRecord("maincategory", action.payload)
    // yield put({ type: UPDATE_SUBCTEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "admin/subcategory", action.payload)
    yield put({ type: DELETE_SUBCTEGORY_RED, payload: action.payload })
}
export default function* subcategorySagas() {
    yield takeEvery(CREATE_SUBCTEGORY, createSaga)
    yield takeEvery(GET_SUBCTEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCTEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCTEGORY, deleteSaga)

}