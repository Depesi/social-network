import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/FormsControls';
import { login, logout } from '../../redux/auth-reducer';
import style from './Login.module.scss';
import { Redirect } from 'react-router-dom';

let LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				{createField(style.login__form_input, 'Email', [required], 'email', Input, 'text')}
			</div>
			<div>
				{createField(style.login__form_input, 'Password', [required], 'password', Input, 'password')}
			</div>
			<div>
				{createField(style.login__form_checkbox, null, null, 'rememberMe', Input, 'checkbox', null, "remember Me")}
			</div>
			{captchaUrl && <img src={captchaUrl}></img>}
			{captchaUrl && createField(null, 'Anti-bot Symbols', [required], 'captcha', Input, 'text')}

			{error && <div className={style.form__error}>
				{error}
			</div>}
			<div>
				<button className={style.login__form_bttn}>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login'				//!БИБЛИОТЕКА REDUX-FORM
})(LoginForm)

let Login = (props) => {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	if (props.isAuth) {
		return <Redirect to={"/profile"} />
	}

	return (
		<div className={style.login__form}>
			<h1 className={style.login__header}>LOGIN</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />

		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		captchaUrl: state.auth.captchaUrl
	}
}


export default connect(mapStateToProps, { login, logout, })(Login);