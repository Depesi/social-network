import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'social-set/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload
			}
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.captchaUrl
			}

		default:
			return state;
	}

}

export const setAuthUserData = (id, email, login, isAuth) => {
	return {
		type: SET_USER_DATA,
		payload: { id, email, login, isAuth }
	}
}

export const getCaptchaUrlSuccess = (captchaUrl) => {
	return {
		type: GET_CAPTCHA_URL_SUCCESS,
		captchaUrl
	}
}

//САНКИ

export const getLoginThunkCreator = () => async (dispatch) => {
	let data = await authAPI.getLogin();
	if (data.resultCode === 0) {
		let { id, login, email } = data.data;
		dispatch(setAuthUserData(id, login, email, true));
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	let data = await authAPI.login(email, password, rememberMe, captcha);

	if (data.resultCode === 0) {
		dispatch(getLoginThunkCreator());
	}
	else {
		if (data.resultCode === 10) {
			dispatch(getCaptchaUrl());
		}
		let message = data.messages.length > 0 ? data.messages[0] : "Some error"
		dispatch(stopSubmit("login", { _error: message }));
	}
}

export const getCaptchaUrl = () => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl();
	const captchaUrl = data.url;

	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
	let data = await authAPI.logout();
	if (data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

//.САНКИ

export default authReducer;
