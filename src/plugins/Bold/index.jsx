import React from 'react'
import Icon from './../../components/Icon'

const MARK_NAME = 'bold'

const toggleBold = (editor) => {
	return editor.toggleMark(MARK_NAME)
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'b'
}

const hasBold = (value) => {
	return value.activeMarks.some((mark) => mark.type === MARK_NAME)
}

const ControlButton = ({ editor, onChange }) => (
	<Icon
		className={`${hasBold(editor.value) ? 'active' : ''}`}
		name="bold"
		onMouseDown={(e) => {
			e.preventDefault()
			editor.command(toggleBold)
			onChange(editor.value)
		}}
		tip="加粗"
	/>
)

export default (options) => {
	return {
		changes: {
			toggleBold
		},
		components: {
			ControlButton
		},
		helpers: {
			hasBold
		},
		plugins: {
			renderMark: (props) => {
				const { children, mark, attributes } = props
				if (mark.type === MARK_NAME) {
					return <b {...attributes}>{children}</b>
				}
			},
			onKeyDown: (event, editor, next) => {
				if (!isHotKey(event)) return next()

				event.preventDefault()
				editor.command(toggleBold)
				return true
			}
		}
	}
}
