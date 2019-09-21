export const setCurrentUser = user => {
    return {
        type: "SIGNIN_USER",
        isAuth: user.isAuth,
        login: user.login,
        userID: user.userID
    };
};

export const signOut = () => {
    return {
        type: "SIGNOUT_USER"
    };
};

export const getMessagesCount = count => {
    return {
        type: "MESSAGE_COUTER",
        count
    };
};
