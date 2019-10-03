export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(creds) {
    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "email": creds.email,
            "password": creds.password
        }
    }

    return dispatch => {
        dispatch(requestLogin(creds))

        return fetch("http://localhost:3001/api/user/login")
            .then(response => {
                response.json()
            })
            .then(user => {
                console.log("USER", user)
            })
            .catch(error => {
                console.log("Error:", error)
            })
    }
}
