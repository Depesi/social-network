import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';
import style from './Navbar.module.scss'

let Nav = (props) => {
	let friends =
		props.state.sidebarFriends.map((p) => {
			return <Friends friendName={p.friendName} imgUrl={p.imgUrl} key={p.id} />;
		});

	return (
		<nav className={style.nav}>
			<ul className={style.nav__list}>
				<li> <NavLink to="/profile" activeClassName={style.active__link}>Profile </NavLink> </li>
				<li> <NavLink to="/dialogs" activeClassName={style.active__link}>Dialogs </NavLink></li>
				<li> <NavLink to="/users" activeClassName={style.active__link}>Users </NavLink></li>
				<li> <NavLink to="/music" activeClassName={style.active__link}> Music</NavLink></li>
				<li> <NavLink to="/settings" activeClassName={style.active__link}>Settings </NavLink></li>
				<li> <NavLink to="/news" activeClassName={style.active__link}>News </NavLink></li>
				<li> <NavLink to="/friends" activeClassName={style.active__link}>Friends </NavLink></li>
				<div className={style.friends__row}>{friends}</div>
			</ul>

		</nav>
	);
}


export default Nav;