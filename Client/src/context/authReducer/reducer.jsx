import * as constants from "./constants";

export const initState = {
    user: null,
    admin: null
};

export function reducer (state, action){
    switch(action.type){
        case constants.LOGIN_AUTH:
            return {
                ...state,
                user:action.payload
            }
        case constants.LOGIN_ADMIN:
            return{
                ...state,
                admin: action.payload
            }
        case constants.LOGOUT_AUTH:
            return{
                ...state,
                user:null
            }
        default:
            throw Error("Invalid action");
    }
}