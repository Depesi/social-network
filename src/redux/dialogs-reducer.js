const ADD_MESSAGE = 'ADD-MESSAGE';


let initialState = {
	messagesData: [
		{ id: 1, message: "Привет!", imgUrl: "https://hashtelegraph.com/wp-content/uploads/2021/04/doge-astronaut-1024x576.jpg" },
		{ id: 2, message: "Пока!", imgUrl: "https://i.pinimg.com/736x/4a/bc/c0/4abcc00427dbb86ee5da8270b52204f8.jpg" },
		{ id: 3, message: "hіііi", imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg" },
		{ id: 4, message: "no hi", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg" },
	],
	dialogsData: [
		{ id: 1, name: 'Anton Khomitskiy', imgUrl: 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg' },
		{ id: 2, name: 'Meltim', imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg" },
		{ id: 3, name: 'Ira Seryogina', imgUrl: "https://i.pinimg.com/736x/4a/bc/c0/4abcc00427dbb86ee5da8270b52204f8.jpg" },
		{ id: 4, name: 'Vera Seryogina', imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg" },
		{ id: 5, name: 'Depesi', imgUrl: "https://hashtelegraph.com/wp-content/uploads/2021/04/doge-astronaut-1024x576.jpg" },
	]
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: 5,
				message: action.newMessageBody, // Для форм
				imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg",
			};
			return {
				...state,
				messagesData: [...state.messagesData, newMessage], // После запятой я добавляю новый элемент без использования пуша. НОВЫЙ СИНТАКСИС!
			};
		default:
			return state;
	}
}

export const addMessageCreator = (newMessageBody) => {
	return {
		type: ADD_MESSAGE,
		newMessageBody
	}
}

export default dialogsReducer;