import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED } from "../Constent";
// import { createmultipathRecord, createRecord, deleteRecord, getRecord, updateRecord } from './Services/Index';
import { createRecord, deleteRecord, getRecord, updatemultiRecord, updateRecord } from './Services/Index';
import { takeEvery, put, call } from "redux-saga/effects";


function* createSaga(action) {
    let responce = yield call(createRecord, "wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: responce })

    // let responce = yield createmultipathRecord("wishlist")
    // yield put({ type: CREATE_WISHLIST_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "wishlist", action.payload)
    yield put({ type: GET_WISHLIST_RED, payload: responce })
}
// function* updateSaga(action) {
//     let responce = yield updateRecord("wishlist", action.payload)
//     yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })

//     // let responce = yield updatemultiRecord("wishlist", action.payload)
//     // yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })
// }
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}
export default function* wishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)
    yield takeEvery(GET_WISHLIST, getSaga)
    // yield takeEvery(UPDATE_WISHLIST, updateSaga)
    yield takeEvery(DELETE_WISHLIST, deleteSaga)

}