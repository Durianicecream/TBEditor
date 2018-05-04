import React from 'react'
import './index.less'

export default class Modal extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		const { maxHeight = 300, width = 200, children, visibale } = this.props
		return (
			<div className={`modal ${visibale ? 'active' : ''}`}>
				<div className="mask" />
				{children}
			</div>
		)
	}
}
