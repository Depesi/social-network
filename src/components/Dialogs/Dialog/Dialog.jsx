import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Dialog.module.scss';

const Dialog = (props) => {
	return (
		<div>
			<div className={style.dialogs__item}>
				<div className={style.dialogs__item_avatar}>
					<img src={props.imgUrl} />
				</div>
				<div className={style.dialogs__item_name}>
					<NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Dialog;