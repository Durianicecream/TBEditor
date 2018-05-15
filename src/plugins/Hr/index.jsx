import React from 'react'
import Icon from './../../components/Icon'

const addHr = (value) => {
	const change = value.change()
	const node = value.focusBlock
	return change.collapseToEndOf(node).insertBlock({
		type: 'hr',
		isVoid: true
	})
}

const ControlButton = ({ value, onChange }) => (
	<Icon name="minus" onClick={(e) => onChange(addHr(value))} tip={'分割线'} />
)

export default (options) => {
	return {
		changes: {
			addHr
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
