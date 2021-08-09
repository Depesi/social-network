import React from 'react';
import { Field } from 'redux-form';
import style from './FormsControls.module.scss';

const FormControl = ({ input, meta: { touched, error }, children }) => {

	const hasError = touched && error;
	return (
		<div>
			{children}
			{hasError && <div className={style.error__text}>
				{error}
			</div>}
		</div>
	)
}

export const Textarea = (props) => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<div>
				<textarea {...input} {...restProps} />
			</div>
		</FormControl>
	)
}


export const Input = (props) => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<div>
				<input {...input} {...restProps} />
			</div>
		</FormControl>
	)
}

export const createField = (className, placeholder, validate, name, component, type, props = {}, text = "") => {
	return (
		<>
			<Field className={className} placeholder={placeholder}
				validate={validate} name={name}
				component={component} type={type} {...props} />
			{text}
		</>
	)
}