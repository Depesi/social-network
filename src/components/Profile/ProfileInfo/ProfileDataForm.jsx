import React from 'react';
import { createField, Input, Textarea } from '../../common/FormControls/FormsControls';
import { reduxForm } from 'redux-form';
import style from './ProfileInfo.module.scss';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
	return (
		<form className={style.profile__info} onSubmit={handleSubmit}>
			<div className={style.profile__info_name}>
				{createField(null, "Full name", [], "fullName", Input, "text")}
			</div>
			<div className={style.profile__info_list}>
				<ul className={style.info__list_user}>
					<li> {createField(null, "About me", [], "aboutMe", Textarea, "textarea")}</li>
					<li> looking for a job: {createField(null, "", [], "lookingForAJob", Input, "checkbox")} </li>
					<div>
						<li>My skills: {createField(null, "My skills", [], "lookingForAJobDescription", Textarea, "textarea")} </li>
					</div>
					<li>Contacts: {Object.keys(profile.contacts).map(key => {
						return (
							<div key={key} className={style.contact}>
								<b> {key} : {createField(null, key, [], `contacts.${key}`, Input, "text")}</b>
							</div>
						)
					})}</li>
				</ul>
			</div>
			{error && <div className={style.form__error}>
				{error}
			</div>}
			<button>Save</button>
		</form>
	)
}

export const ProfileDataFormRedux = reduxForm({
	form: 'profileDataForm'				//!БИБЛИОТЕКА REDUX-FORM
})(ProfileDataForm)
