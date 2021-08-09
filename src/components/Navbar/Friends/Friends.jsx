import React from 'react';
import style from './Friends.module.scss'
let Friends = (props) => {
	return (
		<div className={style.friend__item}>
			<img className={style.friend__item_avatar} src={props.imgUrl} alt="" />
			<span className={style.friend__item_name}>
				{props.friendName}
			</span>

		</div>
	)

}

export default Friends;