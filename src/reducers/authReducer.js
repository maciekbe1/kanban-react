const INITIAL_STATE = {
    isAuth: null,
    login: null,
    userID: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SIGNIN_USER":
            return {
                ...state,
                isAuth: action.isAuth,
                login: action.login,
                userID: action.userID
            };
        case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: null,
                login: null,
                userID: null
            };
        default:
            return state;
    }
};
