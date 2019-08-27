import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

export const isAuthenticated = () => {
	const cookies = new Cookies();
	const token = cookies.get("token");
	const expiresAt = jwt.decode(token);
	if (expiresAt !== null) {
		return {
			// isAuth: new Date().getTime() < expiresAt.exp * 1000,
			isAuth: true,
			login: expiresAt.login,
			userID: expiresAt.id
		};
	}
	return { isAuth: false, login: null, userID: null };
};
