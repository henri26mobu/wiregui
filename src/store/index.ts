import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer from "./modules/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export default store;
