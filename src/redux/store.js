import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import reducers from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistRed = persistReducer(persistConfig, reducers);

// export const store = createStore(persistRed, applyMiddleware(thunk))
export const store = createStore(persistRed, composeWithDevTools());
export const persistor = persistStore(store);
