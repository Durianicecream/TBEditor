import React from 'react'
import Icon from './../../components/Icon'
import DropDown from './../../components/Dropdown'

const addText = (value, emoji) => {
	const change = value.change()
	return change
		.insertText(emoji)
		.collapseToStartOfNextText()
		.focus()
}

const EMOJIS = [
	'😃',
	'😬',
	'😂',
	'😅',
	'😄',
	'😆',
	'😍',
	'😱',
	'😎',
	'🙄',
	'🤣',
	'😄',
	'🤣',
	'😜',
	'💩'
]

class ControlButton extends React.Component {
	constructor() {
		super()
		this.state = {
			dropdownVisible: false
		}
	}

	showDropDown = (event) => {
		this.setState({ dropdownVisible: true })
		event.nativeEvent.stopImmediatePropagation()
		document.addEventListener('click', this.hideDropDown)
	}

	hideDropDown = (event) => {
		this.setState({ dropdownVisible: false })
		document.removeEventListener('click', this.hideDropDown)
	}

	render() {
		const { onChange, value } = this.props
		return (
			<span onClick={this.showDropDown}>
				<Icon name="smile-o" />
				<DropDown
					data={EMOJIS.map((item) => (
						<i
							onClick={(e) => {
								event.stopPropagation()
								onChange(addText(value, item))
							}}
						>
							{item}
						</i>
					))}
					type="inline"
					visible={this.state.dropdownVisible}
				/>
			</span>
		)
	}
}

export default (options) => {
	return {
		changes: {
			addText
		},
		components: {
			ControlButton
		}
	}
}
