import React from 'react'
import { Modal, Button } from 'antd'
import Icon from '../.././components/Icon'

const toggleQuote = (value) => {
	const change = value.change()
	return change
		.setBlocks(hasQuote(value) ? 'paragraph' : 'quote')
		.setBlocks({ isVoid: false })
		.focus()
}

const hasQuote = (value) => {
	return value.blocks.every((node) => node.type === 'quote')
}

const ControlButton = ({ value, onChange }) => (
	<Icon
		className={`${hasQuote(value) ? 'active' : ''}`}
		name="quote-left"
		onClick={(e) => onChange(toggleQuote(value))}
		tip="引用"
	/>
)

export default (options) => {
	return {
		changes: {
			toggleQuote
		},
		components: {
			ControlButton
		},
		helpers: {
			hasQuote
		},
		plugins: {
			renderNode: (props) => {
				const { children, node, attributes } = props
				if (node.type === 'quote') {
					return <blockquote {...attributes}>{children}</blockquote>
				}
			}
		}
	}
}
