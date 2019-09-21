const INITIAL_STATE = {
    count: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "MESSAGE_COUTER":
            return {
                ...state,
                count: action.count
            };
        default:
            return state;
    }
};
