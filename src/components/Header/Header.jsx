import React from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

	return (
		<header className={style.header}>
			<div className='container'>
				<div className={style.logo__row}>
					<div>
						<img className={style.logo__img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1024px-JSON_vector_logo.svg.png" />
					</div>
					<div className={style.logo__login}>
						{props.isAuth
							? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
							: <NavLink to={'/login'}> Логін</NavLink>}
					</div>
				</div>
			</div>
			<span>{props.text}</span>
		</header>
	);
}
export default Header;