import React from 'react'
import './index.less'
import Icon from '../Icon'
import { Bold, Italic, StrikeThrough } from '../../plugins'

const ItalicButton = Italic().components.ControlButton
const BoldButton = Bold().components.ControlButton
const StrikeThroughButton = StrikeThrough().components.ControlButton

export default class Toolbar extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		const { value, onChange } = this.props
		return (
			<div className="fungo-editor-toolbar">
				<BoldButton value={value} onChange={onChange} />
				<ItalicButton value={value} onChange={onChange} />
				<StrikeThroughButton value={value} onChange={onChange} />

				<i className="fa fa-chain" title="链接" />

				<i className="fa fa-image" title="图片" />

				<i className="fa fa-quote-left" title="引用" />

				<i className="fa fa-minus" title="分割线" />

				<i className="fa fa-header" title="标题" />

				<i className="fa fa-smile-o" title="emoji" />

				<i className="fa fa-undo" title="撤销 ctrl+z" />
				<i className="fa fa-repeat" title="重做 ctrl+y ctrl+shift+z" />

				<i className="fa fa-save" title="保存 ctrl+s" />

				<i className="fa fa-window-maximize" title="全屏" />
			</div>
		)
	}
}
