import React from 'react'
import { Modal, Button } from 'antd'
import Icon from '../.././components/Icon'

const toggleBlock = (value) => {
	const change = value.change()
	return change.setBlocks(hasBlock(value) ? 'paragraph' : 'quote').focus()
}

const hasBlock = (value) => {
	return value.blocks.some((node) => node.type === 'quote')
}

const ControlButton = ({ value, onChange }) => (
	<span
		className={`${hasBlock(value) ? 'active' : ''}`}
		onClick={(e) => onChange(toggleBlock(value))}
	>
		<Icon name="quote-left" />
	</span>
)

export default (options) => {
	return {
		changes: {
			toggleBlock
		},
		components: {
			ControlButton
		},
		helpers: {
			hasBlock
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
