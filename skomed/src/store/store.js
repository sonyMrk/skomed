import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/user";
import { appReducer } from "./reducers/app";
import { hospitalsReducer } from "./reducers/hospitals";
import { appointmentReducer } from "./reducers/appointment";
import { medicationsReducer } from "./reducers/medications";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  hospitals: hospitalsReducer,
  appointment: appointmentReducer,
  medications: medicationsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
