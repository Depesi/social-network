import React, { useEffect, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import style from './ProfileInfo.module.scss';
import defaultAvatar from '../../../assets/img/default_avatar.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { ProfileDataFormRedux } from './ProfileDataForm';

const ProfileInfo = ({ saveProfile, ...props }) => {

	let [editMode, setEditMode] = useState(false);

	useEffect(() => {
		if (props.isProfileUpdate) {
			setEditMode(false);
		}
	}, [props.isProfileUpdate]);

	let state = props.profile;

	if (!state.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	}

	const onSubmit = async (formData) => {
		await saveProfile(formData);
	}


	return (
		<div className="profileInfo">
			<div className={style.content__background_img}>
				<img src={props.backgroundImg} />
			</div>
			<div className={style.profile__row}>
				<div className={style.profile__avatar}>
					{state.profile.photos.small ? <img src={state.profile.photos.small} />
						: <img src={defaultAvatar} />}
					<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
					{props.isOwner &&
						<div>
							<label htmlFor={"myfile"} className={style.label__button_photo}> Изменить фото </label>
							<input type={"file"} className={style.button_photo} id={"myfile"} onChange={onMainPhotoSelected} />
						</div>
					}
				</div>
				{editMode
					? <ProfileDataFormRedux initialValues={state.profile} onSubmit={onSubmit} profile={state.profile} />
					: <ProfileData profile={state.profile}
						isOwner={props.isOwner}
						goToEditMode={() => { setEditMode(true) }} />
				}
			</div>
		</div>
	);
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return (
		<div className={style.profile__info}>
			<div className={style.profile__info_name}>
				{profile.fullName}
			</div>
			<div className={style.profile__info_list}>
				<ul className={style.info__list_user}>
					<li>About me: {profile.aboutMe}</li>
					<li>Looking for a job: {profile.lookingForAJob === true
						? <img className={style.looking__job_img} src={`https://memepedia.ru/wp-content/uploads/2019/11/da.png`} />
						: <img className={style.looking__job_img} src={`https://socialist.news/pic/position/art/2020/net/net2.png`} />}</li>
					{profile.lookingForAJob &&
						<div>
							<li>My skills: {profile.lookingForAJobDescription} </li>
						</div>
					}
					<li>Contacts: {Object.keys(profile.contacts).map(key => {
						if (profile.contacts[key]) {
							return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
						}
					})}</li>
				</ul>
			</div>
			{isOwner &&
				<button onClick={goToEditMode}>Edit</button>
			}
		</div>
	)
}

export const Contacts = ({ contactTitle, contactValue }) => {
	return <div>
		{contactTitle}: {contactValue}
	</div>
}

export default ProfileInfo;