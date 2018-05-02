import React from 'react'
import './font-awesome.css'

export default class Icon extends React.Component {
	render() {
		const { name } = this.props
		return <i className={`fa fa-${name}`} />
	}
}
