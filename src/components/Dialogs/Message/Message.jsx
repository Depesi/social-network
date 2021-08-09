import React from 'react';
import style from './Message.module.scss';

let Message = (props) => {
	return (
		<div>
			<div className={style.messages__item}>
				<div className={style.messages__item_img}>
					<img src={props.imgUrl} />
				</div>
				<div className={style.messages__item_text}>
					{props.text}
				</div>
			</div>
		</div>
	);
}

export default Message;