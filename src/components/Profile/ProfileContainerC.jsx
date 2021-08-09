import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getIsAuth } from '../../redux/auth-selectors';
import { setUserProfile, addPostCreator, getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import Profile from './Profile';

class ProfileContainerC extends React.Component {

	refreshProfile() {
		let userId = this.props.match.params.userId;

		if (!userId) {
			userId = this.props.authorizedUserId;
		}
		this.props.getProfileThunkCreator(userId);
		this.props.getStatus(userId);
	}

	componentDidMount() {
		this.refreshProfile();
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<Profile {...this.props}
				isOwner={!this.props.match.params.userId}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
				saveProfile={this.props.saveProfile}
				isProfileUpdate={this.props.isProfileUpdate} />
		);
	}
}

let mapStateToProps = (state) => {
	return {
		profile: state.profilePage,
		profileInfo: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.id,
		isAuth: getIsAuth(state),
		isProfileUpdate: state.profilePage.isProfileUpdate
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => { dispatch(addPostCreator(newPostText)); },

		setUserProfile: (profile) => {
			let action = setUserProfile(profile)
			dispatch(action);
		},
		getStatus: (userId) => {
			let action = getStatus(userId)
			dispatch(action);
		},
		updateStatus: (status) => {
			dispatch(updateStatus(status));
		},
		getProfileThunkCreator: (userId) => {
			dispatch(getProfileThunkCreator(userId))
		},
		savePhoto: (photo) => {
			dispatch(savePhoto(photo))
		},
		saveProfile: (data) => {
			dispatch(saveProfile(data))
		}
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
	withAuthRedirect
)(ProfileContainerC)
