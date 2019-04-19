import React from 'react'
import Icon from './../../components/Icon'

const addHr = (editor) => {
	const node = editor.value.focusBlock
	try {
		editor.collapseToEndOf(node).insertBlock({
			type: 'hr',
			isVoid: true
		})
	} catch (err) {
		message.error('插入失败')
	}
}

const ControlButton = ({ editor, onChange }) => (
	<Icon
		name="minus"
		onClick={(e) => {
			e.preventDefault()
			editor.command(addHr)
			onChange(editor.value)
		}}
		tip="分割线"
	/>
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
				const { node, attributes, isSelected } = props
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
