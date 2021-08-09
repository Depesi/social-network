import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST';
const PROFILE_UPDATE = 'PROFILE_UPDATE';

let initialState = {
	postsData: [
		{ id: 1, message: "Hello, world!", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg", likeCount: 10, },
		{ id: 2, message: "Ya popusk :(", imgUrl: "https://hashtelegraph.com/wp-content/uploads/2021/04/doge-astronaut-1024x576.jpg", likeCount: 54, },
		{ id: 3, message: "Ya ne popusk :)", imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg", likeCount: 22, },
		{ id: 4, message: "it-kamasutra", imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg", likeCount: 22, },
		{ id: 5, message: "Aboba", imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg", likeCount: 228, },
	],
	profile: null,
	isProfileUpdate: null,
	status: ""
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 6,
				message: action.newPostText,
				imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg",
				likeCount: 0,
			};
			return {
				...state,
				newPostText: '',
				postsData: [...state.postsData, newPost],
			};
		}

		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile,
			}
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			}

		case DELETE_POST: {
			return {
				...state,
				postsData: state.postsData.filter(p => p.id != action.postId)
			}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos }
			}
		}
		case PROFILE_UPDATE: {
			return {
				...state,
				isProfileUpdate: action.isProfileUpdate
			}
		}

		default:
			return state;
	}

}

export const addPostCreator = (newPostText) => {
	return {
		type: ADD_POST,
		newPostText
	}
}

export const setUserProfile = (profile) => {
	return {
		type: SET_USER_PROFILE,
		profile
	}
}

export const setStatus = (status) => {
	return {
		type: SET_STATUS,
		status
	}
}

export const savePhotoSuccess = (photos) => {
	return {
		type: SAVE_PHOTO_SUCCESS,
		photos
	}
}

export const deletePost = (postId) => {
	return {
		type: DELETE_POST,
		postId
	}
}

export const isProfileUpdate = (isProfileUpdate) => {
	return {
		type: PROFILE_UPDATE,
		isProfileUpdate
	}
}
//САНКИ

export const getProfileThunkCreator = (userId) => async (dispatch) => {
	let data = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
	let data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
	try {
		let data = await profileAPI.updateStatus(status)
		if (data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	}
	catch (error) {
		debugger
	}
}

export const savePhoto = (file) => async (dispatch) => {
	let data = await profileAPI.savePhoto(file)
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos));
	}
}

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.id;
	const data = await profileAPI.saveProfile(profile);

	if (data.resultCode === 0) {
		dispatch(isProfileUpdate(true))
		await dispatch(getProfileThunkCreator(userId));
		dispatch(isProfileUpdate(false))
	} else {
		dispatch(isProfileUpdate(false));
		dispatch(stopSubmit("profileDataForm", { _error: data.messages[0] }));
		return Promise.reject(data.messages[0]);
	}
}

//.САНКИ

export default profileReducer;