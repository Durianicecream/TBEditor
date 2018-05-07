import React from 'react'
import './index.less'
import Icon from '../Icon'
import {
	Bold,
	Italic,
	StrikeThrough,
	Quote,
	Hr,
	Header,
	Emoji,
	Link,
	Image,
	History
} from '../../plugins'

export default class Toolbar extends React.Component {
	constructor() {
		super()
		this.itemList = [
			Bold,
			Italic,
			StrikeThrough,
			Quote,
			Hr,
			Header,
			Emoji,
			Link,
			Image,
			History
		]
	}

	render() {
		return (
			<div className="fungo-editor-toolbar">
				{this.itemList.map((item, index) => {
					const Button = item().components.ControlButton
					return <Button key={index} {...this.props} />
				})}
				<i className="fa fa-save" title="保存 ctrl+s" />
				<i className="fa fa-window-maximize" title="全屏" />
			</div>
		)
	}
}
