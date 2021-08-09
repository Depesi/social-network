import React from 'react';
import style from './Profile.module.scss';
import NewPost from './NewPost/NewPost';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormControls/FormsControls';

let maxLength10 = maxLengthCreator(10);

let Profile = (props) => {

	let state = props.profile;
	let postElements = [...state.postsData].reverse().map((p) => {
		return <NewPost message={p.message} imgUrl={p.imgUrl} likeCount={p.likeCount} key={p.id} />;
	});

	let onAddPost = (values) => {
		props.addPost(values.newPostText);
	}

	return (
		<div>
			<ProfileInfo isOwner={props.isOwner}
				savePhoto={props.savePhoto}
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
				saveProfile={props.saveProfile}
				backgroundImg="https://images.wallpaperscraft.ru/image/tekstura_fon_tekst_simvoly_50473_1920x1080.jpg"
				contacts={props.contacts}
				aboutMe={props.aboutMe}
				isProfileUpdate={props.isProfileUpdate} />

			<h2 className="heading">My Post</h2>
			<AddNewPostFormRedux onSubmit={onAddPost} />
			<div className={style.profile__wall}>
				{postElements}
			</div>
		</div>
	)
}

const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field component={Textarea}
				className={style.input__post_text} name={"newPostText"} placeholder="New post..." validate={[required, maxLength10]} />
			<div className={style.input__post_button}>
				<button> Send </button>
			</div>
		</form>
	)
}

const AddNewPostFormRedux = reduxForm({
	form: 'ProfileAddNewPostForm'				//!БИБЛИОТЕКА REDUX-FORM
})(AddNewPostForm)


export default Profile;