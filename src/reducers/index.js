import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import messagesReducer from "../reducers/messagesReducer";

export default combineReducers({
    authReducer,
    messagesReducer
});
