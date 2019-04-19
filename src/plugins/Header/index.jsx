import React from 'react'
import Icon from './../../components/Icon'

const toggleHeader = (editor, level) => {
	return editor
		.setBlocks(hasHeader(editor.value, level) ? 'paragraph' : `h${level}`)
		.setBlocks({ isVoid: false })
}

const hasHeader = (value, level) => {
	return value.blocks.some((node) => node.type === `h${level}`)
}

const ControlButton = ({ editor, onChange }) => {
	const levelList = [1, 2, 3]
	return (
		<span>
			{levelList.map((level) => (
				<Icon
					key={level}
					className={`${hasHeader(editor.value, level) ? 'active' : ''}`}
					name={`h${level}`}
					onMouseDown={(e) => {
						e.preventDefault()
						onChange(toggleHeader(editor, level))
					}}
					tip={`${level}级标题`}
				/>
			))}
		</span>
	)
}

export default (options) => {
	return {
		changes: {
			toggleHeader
		},
		components: {
			ControlButton
		},
		helpers: {
			hasHeader
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
