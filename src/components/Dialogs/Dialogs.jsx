import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormControls/FormsControls';
import Dialog from './Dialog/Dialog';
import style from './Dialogs.module.scss';
import Message from './Message/Message';

const maxLength100 = maxLengthCreator(100);

let Dialogs = (props) => {

	let state = props.dialogsPage;

	let dialogsElements = state.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} imgUrl={dialog.imgUrl} key={dialog.id} />);
	let messageElements = state.messagesData.map((m) => {
		return <Message imgUrl={m.imgUrl} text={m.message} key={m.id} />;
	});

	let addNewMessage = (values) => {
		if (!values.newMessageBody || values.newMessageBody == '') {
			alert('Сообщение должно содержать минимум 1 символ')
		}
		else {
			props.addMessage(values.newMessageBody);
			values.newMessageBody = '';
		}
	}

	return (
		<div>
			<h2 className="heading">Dialogs</h2>
			<div className={style.dialogs__page}>
				<div className={style.dialogs}>
					{dialogsElements}
				</div>
				<div className={style.messages}>
					{messageElements}
					<AddMessageFormRedux onSubmit={addNewMessage} />
				</div>
			</div>
		</div>
	);
}

const AddMessageForm = (props) => {
	return (
		<form className={style.newMessage} onSubmit={props.handleSubmit}>
			<Field component={Textarea} className={style.newMessages__input} name="newMessageBody" placeholder="New message" validate={[required, maxLength100]} />
			<button className={style.newMessages__button}> Send </button>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({
	form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;