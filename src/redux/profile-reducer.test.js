import profileReducer, { addPostCreator, deletePost } from "./profile-reducer";

let state = {
	postsData: [
		{ id: 1, message: "Hello, world!", imgUrl: "https://cs16planet.ru/steam-avatars/images/avatar3219.jpg", likeCount: 10, },
		{ id: 2, message: "Ya popusk :(", imgUrl: "https://hashtelegraph.com/wp-content/uploads/2021/04/doge-astronaut-1024x576.jpg", likeCount: 54, },
		{ id: 3, message: "Ya ne popusk :)", imgUrl: "https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg", likeCount: 22, },
		{ id: 4, message: "it-kamasutra", imgUrl: "https://www.meme-arsenal.com/memes/18ae61937bdc909c969f423bc8c55e3f.jpg", likeCount: 22, },
		{ id: 5, message: "Aboba", imgUrl: "https://i.pinimg.com/originals/7b/e0/4f/7be04f1d514b2583dc5b99fb22005ccd.jpg", likeCount: 228, },
	]
};

test('length of posts should be incremented', () => {
	// 1. test Data
	let action = addPostCreator("Anton");

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation 
	expect(newState.postsData.length).toBe(6);
});

test('text of message should be correct', () => {
	// 1. test Data
	let action = addPostCreator("Anton");

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation 
	expect(newState.postsData[5].message).toBe("Anton");
});

test('after deleting length of messages should be decrement', () => {
	// 1. test Data
	let action = deletePost(1);

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation 
	expect(newState.postsData.length).toBe(4);
});

test('after deleting length should not be decrement if id os incorrect', () => {
	// 1. test Data
	let action = deletePost(1000);

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation 
	expect(newState.postsData.length).toBe(5);
});

