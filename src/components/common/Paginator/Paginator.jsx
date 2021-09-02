import React, { useState } from 'react';
import style from './Paginator.module.scss';
import cn from 'classnames'

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

	let pagesCount = Math.ceil(totalItemsCount / pageSize); //кількість сторінок

	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize); // кількість порцій 
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionNumber = portionNumber * portionSize;

	return (
		<div className={style.paginator__container}>
			<div className={style.paginator__row}>
				{portionNumber > 1
					? <button className={style.button__navigation} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
					: <button className={style.button__navigation} onClick={() => { setPortionNumber(portionNumber - 1) }} disabled>PREV</button>
				}

				{pages
					.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
					.map((p) => {
						return <span key={p} className={cn(style.paginator__item, { [style.selected__page]: currentPage === p })}
							onClick={(e) => { onPageChanged(p); }}>{p}</span>
					})
				}

				{portionCount > portionNumber
					? <button className={style.button__navigation} onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
					: <button className={style.button__navigation} onClick={() => { setPortionNumber(portionNumber + 1) }} disabled>NEXT</button>
				}

			</div >
		</div >
	)
}

export default Paginator;