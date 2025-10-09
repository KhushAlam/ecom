import { configureStore } from "@reduxjs/toolkit";
import  RootSagas  from './Sagas/Rootsaga'
import  Rootreducers  from "./Reducers/Rootreducers";
import createSagaMiddleware from "redux-saga";

const Saga = createSagaMiddleware()

const Store = configureStore({
    reducer: Rootreducers,
    middleware: () => [Saga]
})
export default Store
Saga.run(RootSagas); 