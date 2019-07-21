export default function reducer(state, { type, payload }) {
    switch (type) {
        case "SIGNIN_USER":
            return {
                ...state,
                isAuth: payload.isAuth,
                login: payload.login,
                userId: payload.userId
            };
        case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: false,
                login: null,
                userId: null
            };
        default:
            return state;
    }
}
