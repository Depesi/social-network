import React from 'react';
import style from './Users.module.scss';
import userPhoto from '../../assets/img/default_avatar.jpg';
import { NavLink } from 'react-router-dom';

let User = ({ user, isAuth, followingInProgress, unfollow, follow }) => {
	return (
		<div className={style.user__row}>
			<div className={style.user__profile}>
				<div>
					<NavLink to={'/profile/' + user.id}>
						<img src={user.photos.small != null ? user.photos.small : userPhoto} className={style.user__avatar} />
					</NavLink>
				</div>
				<div>
					{!isAuth ? <button disabled={true} className={style.notAuth__profile_btn}> Follow</button>
						: user.followed
							? <button disabled={followingInProgress.some(id => id === user.id)} className={style.user__profile_btn} onClick={() => {
								unfollow(user.id)
							}}> Unfollow</button>
							: <button disabled={followingInProgress.some(id => id === user.id)} className={style.user__profile_btn} onClick={() => {
								follow(user.id)
							}}> Follow</button>
					}
				</div>
			</div>

			<div className={style.user__info}>
				<div className={style.user__info_name}>
					<div>Name: {user.name}</div>
					<div>Status: {user.status}</div>
				</div>

				<div className={style.user__info_country}>
					<div>Country: {"u.location.country"}</div>
					<div>City: {"u.location.city"}</div>
				</div>
			</div>
		</div>
	)
}

export default User;