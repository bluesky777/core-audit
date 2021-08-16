import AUTH_ACTIONS from "src/auditorias/actions/AuthActions";

export const AuthReducer = (state = {isLogged: false}, action) => {
    console.log({state});
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_USER:
            console.log('A LOGUEAR');
            break;
    
        default:
            break;
    }
    return state;
}
