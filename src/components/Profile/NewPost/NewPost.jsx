import React from 'react';
import style from './NewPost.module.scss';


let NewPost = (props) => {
	return (
		<div className={style.profile__wall_post}>
			<div className={style.wall__post_content}>
				<div>
					<img className={style.wall__post_avatar} src={props.imgUrl} />
				</div>
				<div className={style.wall__post_text}>
					{props.message}
				</div>
			</div>
			<div className={style.post__like_count}>
				{props.likeCount}
			</div>
		</div>
	);
}

export default NewPost;