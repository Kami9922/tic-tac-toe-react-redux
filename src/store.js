import { legacy_createStore as createStore } from "redux";
import { appReducer } from "./reducer";

export const store = createStore(appReducer);
