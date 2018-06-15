import React from 'react'
import './index.less'

export default class Modal extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		const { children, visibale } = this.props
		return (
			<div className={`tb-modal ${visibale ? 'active' : ''}`}>
				<div className="mask" />
				{children}
			</div>
		)
	}
}
