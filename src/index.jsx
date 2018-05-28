import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './editor.less'
import {
	StrikeThrough,
	Bold,
	Italic,
	Quote,
	Hr,
	Header,
	Link,
	Image,
	Hisrory,
	Common,
	Emoji,
	History
} from './plugins'
import { FullScreen, Preview } from './features'
import HtmlSerializer from './utils/Html'

export default class FungoEditor extends React.Component {
	static propTypes = {
		defaultValue: PropTypes.string.isRequired,
		uploadProps: PropTypes.shape({
			name: PropTypes.string,
			action: PropTypes.string
		}),
		onChange: PropTypes.func.isRequired
	}

	static defaultProps = {
		uploadProps: {
			name: 'image',
			action: '/'
		}
	}

	constructor() {
		super()
		this.state = {
			fullScreen: false,
			hasReceivedHtml: false,
			value: HtmlSerializer.deserialize('')
		}
		this.plugins = [
			StrikeThrough().plugins,
			Bold().plugins,
			Italic().plugins,
			Quote().plugins,
			Hr().plugins,
			Header().plugins,
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

	handleFullScreen = (isFull) => {
		this.setState({ fullScreen: isFull })
	}

	componentWillReceiveProps(props) {
		if (
			!this.state.hasReceivedHtml &&
			props.defaultValue.replace(/(<p>|<\/p>)/g, '')
		) {
			this.setState({
				value: HtmlSerializer.deserialize(props.defaultValue),
				hasReceivedHtml: true
			})
		}
	}

	render() {
		const value = this.state.value
		const { uploadProps } = this.props
		return (
			<div
				className={`fungo-editor ${this.state.fullScreen ? 'full-screen' : ''}`}
			>
				<div className="fungo-toolbar">
					{this.tools.map((item, index) => {
						const Button = item().components.ControlButton
						return (
							<Button
								key={index}
								onChange={this.onChange}
								value={value}
								uploadProps={uploadProps}
							/>
						)
					})}
					<Preview value={value} />
					<FullScreen
						isFullScreen={this.state.fullScreen}
						onChange={this.handleFullScreen}
					/>
				</div>
				<Editor
					{...this.props}
					className="fungo-contenteditable"
					plugins={this.plugins}
					value={value}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}
