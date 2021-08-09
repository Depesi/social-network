export const required = value => {
	if (value) return undefined;
	return 'Field is required ';
}

// Похоже на санку, передаём в неё значение максимального количества символов
// и потом с помощью замыкания делаем проверку
export const maxLengthCreator = (maxLength) =>
	(value) => {
		if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
		return undefined;
	}
