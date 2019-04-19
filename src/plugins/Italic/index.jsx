import React from 'react'
import Icon from './../../components/Icon'

const MARK_NAME = 'italic'

const toggleItalic = (editor) => {
	return editor.toggleMark(MARK_NAME)
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'i'
}

const hasItalic = (value) => {
	return value.activeMarks.some((mark) => mark.type === MARK_NAME)
}

const ControlButton = ({ editor, onChange }) => (
	<Icon
		className={`${hasItalic(editor.value) ? 'active' : ''}`}
		name="italic"
		onMouseDown={(e) => {
			e.preventDefault()
			onChange(editor.command(toggleItalic))
		}}
		className={`${hasItalic(editor.value) ? 'active' : ''}`}
		tip="斜体"
	/>
)

export default (options) => {
	return {
		changes: {
			toggleItalic
		},
		components: {
			ControlButton
		},
		helpers: {
			hasItalic
		},
		plugins: {
			renderMark: (props) => {
				const { children, mark, attributes } = props
				if (mark.type === MARK_NAME) {
					return <i {...attributes}>{children}</i>
				}
			},
			onKeyDown: (event, change) => {
				const mark = MARK_NAME

				if (!isHotKey(event)) return
				event.preventDefault()
				change.call(toggleItalic)
				return true
			}
		}
	}
}
