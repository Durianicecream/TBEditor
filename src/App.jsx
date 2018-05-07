import React from 'react'
import { Editor, Plain } from 'slate-react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import './App.less'
import Toolbar from './components/ToolBar'
import {
	StrikeThrough,
	Bold,
	Italic,
	Quote,
	Hr,
	Header,
	Emoji,
	Paragraph,
	Link,
	Image,
	Hisrory,
	Common
} from './plugins'

export default class FungoEditor extends React.Component {
	constructor() {
		super()
		this.state = {
			value: new Html().deserialize('<div>我司谁</div>')
		}
		this.plugins = [
			StrikeThrough().plugins,
			Bold().plugins,
			Italic().plugins,
			Quote().plugins,
			Hr().plugins,
			Header().plugins,
			Emoji().plugins,
			Paragraph().plugins,
			Link().plugins,
			Image().plugins,
			Common().plugins
		]
	}

	onChange = ({ value }) => {
		this.setState({ value })
	}

	render() {
		return (
			<div className="fungo-editor">
				<Toolbar onChange={this.onChange} value={this.state.value} />
				<Editor
					plugins={this.plugins}
					className="fungo-contenteditable"
					value={this.state.value}
					onChange={this.onChange}
					schema={this.schema}
				/>
			</div>
		)
	}
}
