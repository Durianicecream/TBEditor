import React from 'react'
import { Tooltip } from 'antd'
import './font-awesome.css'
import './index.less'

export default class Icon extends React.Component {
	render() {
		const { name, className, tip } = this.props
		return (
			<Tooltip
				title={tip}
				arrowPointAtCenter
				mouseEnterDelay={0.4}
				mouseLeaveDelay={0}
				placement="bottom"
			>
				<i
					{...this.props}
					className={`tb-button fa fa-${name} ${className ? className : ''}`}
				/>
			</Tooltip>
		)
	}
}
