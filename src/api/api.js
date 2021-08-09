import * as axios from "axios";

const instance = axios.create({
	withCredentials: true,
	headers: {
		"API-KEY": "eb65f8c8-af28-431c-b1db-93ed22e3ff5c"
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
	},
	follow(id) {
		return instance.post(`follow/${id}`, {}).then(responce => responce.data)
	},
	unfollow(id) {
		return instance.delete(`follow/${id}`).then(response => response.data)
	},
}

export const authAPI = {
	getLogin() {
		return instance.get(`auth/me`).then(responce => responce.data)
	},
	login(email, password, rememberMe = false, captcha = null) {
		return instance.post(`auth/login`, { email, password, rememberMe, captcha }).then(responce => responce.data)
	},
	logout() {
		return instance.delete(`auth/login`).then(responce => responce.data)
	}
}

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/${userId}`).then(responce => responce.data)
	},
	getStatus(userId) {
		return instance.get(`profile/status/${userId}`).then(responce => responce.data)
	},
	updateStatus(status) {
		return instance.put(`profile/status`, { status }).then(responce => responce.data)
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append("image", photoFile)
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(responce => responce.data)
	},
	saveProfile(profile) {
		return instance.put(`profile`, profile).then(responce => responce.data)
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`).then(responce => responce.data)
	}
}