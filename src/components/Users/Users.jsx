import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
	return (
		<div>
			<Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
				currentPage={currentPage} onPageChanged={onPageChanged} />

			<div>
				{props.users.map(u => <User user={u}
					key={u.id}
					followingInProgress={props.followingInProgress}
					unfollow={props.unfollow}
					follow={props.follow}
					isAuth={props.isAuth} />
				)}
			</div>
		</div>
	)
}

export default Users;