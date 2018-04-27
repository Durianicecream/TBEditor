import React from 'react'
import './index.less'

export default class Toolbar extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		return (
			<div className="fungo-editor-toolbar">
				<i className="fa fa-bold" title="加粗 ctrl+b" />
				<i className="fa fa-italic" title="斜体 ctrl+i" />
				<i className="fa fa-strikethrough" title="删除线 ctrl+s" />

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
