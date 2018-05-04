import React from 'react'
import Icon from './../../components/Icon'

const toggleBlock = (value, level) => {
	const change = value.change()
	return change
		.setBlocks(hasBlock(value, level) ? 'paragraph' : `h${level}`)
		.focus()
}

const hasBlock = (value, level) => {
	return value.blocks.some((node) => node.type === `h${level}`)
}

const ControlButton = ({ value, onChange, level }) => (
	<span
		className={`${hasBlock(value, level) ? 'active' : ''}`}
		onClick={(e) => onChange(toggleBlock(value, level))}
	>
		<i className="fa">H{level}</i>
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
				switch (node.type) {
					case 'h1':
						return <h1 {...attributes}>{children}</h1>
					case 'h2':
						return <h2 {...attributes}>{children}</h2>
					case 'h3':
						return <h3 {...attributes}>{children}</h3>
					case 'h4':
						return <h4 {...attributes}>{children}</h4>
					case 'h5':
						return <h5 {...attributes}>{children}</h5>
				}
			}
		}
	}
}
