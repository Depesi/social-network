import React, { useState, useEffect } from 'react';
import style from './ProfileInfo.module.scss';

const ProfileStatusWithHooks = (props) => {

	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateMode = () => {
		setEditMode(true);
	}
	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	}

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className={style.profile__status}>
			{!editMode &&
				<div>
					<span onDoubleClick={activateMode} > {props.status || "Пользователь не указал статус"} </span>
				</div>
			}
			{editMode &&
				<input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
					value={status} />
			}
		</div>
	)
}

export default ProfileStatusWithHooks;