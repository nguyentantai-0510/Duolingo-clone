import * as constants from "./constants";

export function authLogin(payload) {
    return {
        type: constants.LOGIN_AUTH,
        payload
    }
}

export function adminAuthLogin(payload) {
    return {
        type: constants.LOGIN_ADMIN,
        payload
    }
}

export function authLogout() {
    return {
        type: constants.LOGOUT_AUTH,
    }
}

export function authSignup(payload) {
    return {
        type: constants.SIGNUP_AUTH,
        payload
    }
}