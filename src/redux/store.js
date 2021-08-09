import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
	_state: {
		profilePage: {
			postsData: [
				{ id: 1, message: "Hello, world!", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg", likeCount: 10, },
				{ id: 2, message: "Ya popusk :(", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Dogecoin_Logos.png", likeCount: 54, },
				{ id: 3, message: "Ya ne popusk :)", imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg", likeCount: 22, },
				{ id: 4, message: "it-kamasutra", imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg", likeCount: 22, },
				{ id: 5, message: "Вчителька", imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg", likeCount: 228, },
			],
			newPostText: "it"
		},
		dialogsPage: {
			messagesData: [
				{ id: 1, message: "Привет!", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Dogecoin_Logos.png" },
				{ id: 2, message: "Пока!", imgUrl: "https://i.pinimg.com/736x/4a/bc/c0/4abcc00427dbb86ee5da8270b52204f8.jpg" },
				{ id: 3, message: "hi", imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg" },
				{ id: 4, message: "no hi", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg" },
			],
			newMessageText: '',
			dialogsData: [
				{ id: 1, name: 'Anton Khomitskiy', imgUrl: 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg' },
				{ id: 2, name: 'Olya Chebotar', imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg" },
				{ id: 3, name: 'Ira Seryogina', imgUrl: "https://i.pinimg.com/736x/4a/bc/c0/4abcc00427dbb86ee5da8270b52204f8.jpg" },
				{ id: 4, name: 'Vera Seryogina', imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg" },
				{ id: 5, name: 'Depesi', imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Dogecoin_Logos.png" },
			],
		},
		sidebar: {
			sidebarFriends: [
				{ id: 1, friendName: "Anton", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg" },
				{ id: 2, friendName: "Olya", imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Dogecoin_Logos.png" },
				{ id: 3, friendName: "Roma", imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg" },
			]
		}
	},
	_callSubscriber() {
		console.log('state');
	},

	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);
	},

}

export default store;
window.state = store;





