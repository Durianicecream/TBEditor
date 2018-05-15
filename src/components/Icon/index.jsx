import React from 'react'
import { Tooltip } from 'antd'
import './font-awesome.css'
import './index.less'

export default class Icon extends React.Component {
	render() {
		const { name, className, tip } = this.props
		return (
			<Tooltip title={tip}>
				<i
					{...this.props}
					className={`fungo-button fa fa-${name} ${className ? className : ''}`}
				/>
			</Tooltip>
		)
	}
}
