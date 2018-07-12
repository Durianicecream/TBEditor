import React from 'react'
import Icon from './../../components/Icon'

const addHr = (value) => {
	const change = value.change()
	const node = value.focusBlock
	try {
		change.collapseToEndOf(node).insertBlock({
			type: 'hr',
			isVoid: true
		})
	} catch (err) {
		message.error('插入失败')
	}
	return change
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
