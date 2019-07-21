import jwt from "jsonwebtoken";

export const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const token = sessionStorage.getItem("token");
    const expiresAt = jwt.decode(token);
    if (expiresAt !== null) {
        return {
            isAuth: new Date().getTime() < expiresAt.exp * 1000,
            login: expiresAt.login,
            userId: expiresAt.id
        };
    }
    return { isAuth: false, login: null, userId: null };
};
