import React from 'react'
import Icon from './../../components/Icon'

const addBlock = (value) => {
	const change = value.change()
	return change
		.insertBlock({
			type: 'hr',
			isVoid: true
		})
		.insertBlock('paragraph')
		.focus(0)
}

const ControlButton = ({ value, onChange }) => (
	<span onClick={(e) => onChange(addBlock(value))}>
		<Icon name="minus" />
	</span>
)

export default (options) => {
	return {
		changes: {
			addBlock
		},
		components: {
			ControlButton
		},
		plugins: {
			renderNode: (props) => {
				const { children, node, attributes, isSelected } = props
				if (node.type === 'hr') {
					return (
						<hr
							{...attributes}
							className={`hr ${isSelected ? 'selected' : ''}`}
						/>
					)
				}
			}
		}
	}
}
