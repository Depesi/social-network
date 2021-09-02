import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getIsAuth } from '../../redux/auth-selectors';
import { follow, unfollow, setCurrentPage, requestUsers, toggleFollowingProgress, } from '../../redux/users-reducer';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

class UsersContainer extends React.Component {

	componentDidMount() {
		let { currentPage, pageSize } = this.props;
		this.props.requestUsers(currentPage, pageSize);
	}

	onPageChanged = (pageNumber) => {
		let { pageSize } = this.props;
		this.props.requestUsers(pageNumber, pageSize);
	}

	render() {

		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

		let pages = [];
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i);
		}

		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				unfollow={this.props.unfollow}
				follow={this.props.follow}
				followingInProgress={this.props.followingInProgress}
				isAuth={this.props.isAuth}
			/>
		</>

	}
}

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		isAuth: getIsAuth(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		follow, unfollow, setCurrentPage,
		toggleFollowingProgress, requestUsers
	}),
)(UsersContainer)