import React from 'react'
import Icon from './../../components/Icon'
import DropDown from './../../components/Dropdown'

const addInline = (value, code) => {
	const change = value.change()
	return change
		.insertInline({
			type: 'emoji',
			isVoid: true,
			data: { code }
		})
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
					data={EMOJIS.map((item, index) => (
						<i
							onClick={(e) => {
								event.stopPropagation()
								onChange(addInline(value, index))
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
			addInline
		},
		components: {
			ControlButton
		},
		plugins: {
			renderNode: (props) => {
				const { children, node, attributes, isSelected } = props
				if (node.type === 'emoji') {
					const { data } = node
					const code = data.get('code')
					return (
						<span
							className={`emoji ${isSelected ? 'selected' : ''}`}
							{...attributes}
						>
							{EMOJIS[code]}
						</span>
					)
				}
			}
		}
	}
}
