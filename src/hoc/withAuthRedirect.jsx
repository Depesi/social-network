import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

let mapStateToPropsForRedirect = (state) => {
	return {
		isAuth: state.auth.isAuth,
	}
}

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.match) {
				if (!this.props.isAuth) return <Redirect to={"/login"} />
				return <Component {...this.props} />
			}

			let userId = this.props.match.params.userId;
			if (!this.props.isAuth && !userId) return <Redirect to={"/login"} /> //!Возможность зайти не залогиненым на чужой аккаунт
			return <Component {...this.props} />
		}
	}
	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
	return ConnectedAuthRedirectComponent;
}