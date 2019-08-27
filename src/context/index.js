import { createContext } from "react";
import { isAuthenticated } from "../containers/isAuth";
const Context = createContext({
	isAuth: isAuthenticated().isAuth,
	login: isAuthenticated().login,
	userID: isAuthenticated().userID
});

export default Context;
