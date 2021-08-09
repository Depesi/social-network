let initialState = {
	sidebarFriends: [
		{ id: 1, friendName: "Anton", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg" },
		{ id: 2, friendName: "Ira", imgUrl: "https://hashtelegraph.com/wp-content/uploads/2021/04/doge-astronaut-1024x576.jpg" },
		{ id: 3, friendName: "Roma", imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg" },
	]
}

export const sidebarReducer = (state = initialState, action) => {
	return state;
}

export default sidebarReducer;