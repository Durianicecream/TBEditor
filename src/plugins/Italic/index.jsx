import React from 'react'
import Icon from './../../components/Icon'

const toggleItalic = (change) => {
	return change.toggleMark('italic')
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'i'
}

const hasItalic = (value) => {
	return value.activeMarks.some((mark) => mark.type === 'italic')
}

const ControlButton = ({ value, onChange }) => (
	<Icon
		className={`${hasItalic(value) ? 'active' : ''}`}
		name="italic"
		onMouseDown={(e) => {
			e.preventDefault()
			onChange(toggleItalic(value.change()))
		}}
		className={`${hasItalic(value) ? 'active' : ''}`}
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
				if (mark.type === 'italic') {
					return <i {...attributes}>{children}</i>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'italic'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.call(toggleItalic)
				return true
			}
		}
	}
}
