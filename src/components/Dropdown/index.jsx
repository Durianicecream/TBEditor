import React from 'react'
import './index.less'

export default function Dropdown({ type, data, visible = false }) {
	return (
		<span className="dropdown">
			<ul className={visible ? 'active' : ''}>
				{data.map((item, index) => (
					<li className={type} key={index}>
						{item}
					</li>
				))}
			</ul>
		</span>
	)
}
