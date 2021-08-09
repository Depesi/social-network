import React from 'react';
import Nav from './components/Navbar/Nav';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';
import './App.scss';
import { Route } from 'react-router';
import Friends from './components/Friends/Friends';
import UsersContainerC from './components/Users/UsersContainerC';
import HeaderContainerC from './components/Header/HeaderContainerC';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { BrowserRouter, Redirect, Switch, withRouter } from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { withSuspence } from './hoc/withSuspense';

//lazy loading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainerC = React.lazy(() => import('./components/Profile/ProfileContainerC'));

class App extends React.Component {

	catchAllUnhandleErrors = (promiseRejectionEvent) => {
		alert("some error");
		console.error(promiseRejectionEvent);
	}

	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener("unhandleRejection", this.catchAllUnhandleErrors);
	}

	componentWillUnmount() {
		window.removeEventListener("unhandleRejection", this.catchAllUnhandleErrors);
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className="wrapper" >
				<HeaderContainerC />
				<Nav state={this.props.state.sidebar} />
				<div className="wrapper__content">
					<Switch>
						<Route path='/' exact><Redirect to='/profile' /></Route>
						<Route path="/profile/:userId?" render={withSuspence(ProfileContainerC)} />
						<Route path="/dialogs" render={withSuspence(DialogsContainer)} />
						<Route path="/users" render={() => <UsersContainerC />} />
						<Route path="/music" render={() => <Music />} />
						<Route path="/settings" render={() => <Settings />} />
						<Route path="/news" render={() => <News />} />
						<Route path="/friends" render={() => <Friends />} />
						<Route path="/login" render={() => <Login />} />
						<Route path="/*" render={() => <div> 404 NOT FOUND</div>} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized,
	}
}

let AppContainer = compose(
	connect(mapStateToProps, { initializeApp }),
	withRouter
)(App)

export function SamuraiJSApp(props) {
	return <BrowserRouter>
		<Provider store={store} >
			<AppContainer state={store.getState()} />
		</Provider>,
	</BrowserRouter>
}
