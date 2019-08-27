export default function reducer(state, { type, payload }) {
	switch (type) {
		case "SIGNIN_USER":
			return {
				...state,
				isAuth: payload.isAuth,
				login: payload.login,
				userID: payload.userID
			};
		case "SIGNOUT_USER":
			return {
				...state,
				isAuth: false,
				login: null,
				userID: null
			};
		default:
			return state;
	}
}
