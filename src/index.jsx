import React from 'react'
import PropTypes from 'prop-types'
import { Editor, Plain } from 'slate-react'
import { Value } from 'slate'
import './editor.less'
import {
	StrikeThrough,
	Bold,
	Italic,
	Quote,
	Hr,
	Header,
	Paragraph,
	Link,
	Image,
	Hisrory,
	Common,
	Emoji,
	History
} from './plugins'
import HtmlSerializer from './utils/Html'

export default class FungoEditor extends React.Component {
	constructor() {
		super()
		this.state = {}
		this.plugins = [
			StrikeThrough().plugins,
			Bold().plugins,
			Italic().plugins,
			Quote().plugins,
			Hr().plugins,
			Header().plugins,
			Paragraph().plugins,
			Link().plugins,
			Image().plugins,
			Common().plugins
		]
		this.tools = [
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

	onChange = ({ value }) => {
		this.setState({ value })
		this.props.onChange(HtmlSerializer.serialize(value))
	}

	render() {
		const value =
			this.state.value || HtmlSerializer.deserialize(this.props.defaultValue)
		const { uploadProps } = this.props
		return (
			<div className="fungo-editor">
				<div className="fungo-editor-toolbar">
					{this.tools.map((item, index) => {
						const Button = item().components.ControlButton
						if (index === 8)
							// image
							return (
								<Button
									key={index}
									onChange={this.onChange}
									value={value}
									uploadProps={uploadProps}
								/>
							)
						return <Button key={index} onChange={this.onChange} value={value} />
					})}
					{/* <i className="fa fa-save" title="保存 ctrl+s" />
					<i className="fa fa-window-maximize" title="全屏" /> */}
				</div>
				<Editor
					className="fungo-contenteditable"
					plugins={this.plugins}
					value={value}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}

FungoEditor.propTypes = {
	defaultValue: PropTypes.string.isRequired,
	uploadProps: PropTypes.shape({
		name: PropTypes.string,
		action: PropTypes.string
	}),
	onChange: PropTypes.func.isRequired
}
