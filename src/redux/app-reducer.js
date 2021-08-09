import { getLoginThunkCreator } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}

		default:
			return state;
	}
}

export const initializedSuccess = () => {
	return {
		type: INITIALIZED_SUCCESS
	}
}

//САНКИ

export const initializeApp = () => async (dispatch) => {
	await dispatch(getLoginThunkCreator());
	dispatch(initializedSuccess());
}

//.САНКИ

export default appReducer;


