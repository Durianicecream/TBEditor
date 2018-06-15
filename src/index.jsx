import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
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
	Common,
	Emoji,
	History
} from './plugins'
import { FullScreen, Preview } from './features'
import HtmlSerializer from './utils/Html'

export default class TbEditor extends React.Component {
	static propTypes = {
		defaultValue: PropTypes.string,
		uploadProps: PropTypes.shape({
			name: PropTypes.string,
			action: PropTypes.string
		}),
		onChange: PropTypes.func.isRequired
	}

	static defaultProps = {
		defaultValue: '',
		uploadProps: {
			name: 'image',
			action: '/upload'
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			fullScreen: false,
			hasReceivedValue: false,
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
			!this.state.hasReceivedValue &&
			props.defaultValue.replace(/(<p>|<\/p>)/g, '')
		) {
			this.setState({
				value: HtmlSerializer.deserialize(props.defaultValue),
				hasReceivedValue: true
			})
		}
	}

	render() {
		const value = this.state.value
		const { uploadProps } = this.props
		return (
			<div
				className={`tb-editor
				${this.state.fullScreen ? 'full-screen' : ''}`}
			>
				<div className="tb-toolbar">
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
					className="tb-contenteditable"
					plugins={this.plugins}
					value={value}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}
