import React from 'react'
import Icon from './../../components/Icon'

const toggleMark = (change) => {
	return change.toggleMark('italic')
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'i'
}

const hasMark = (value) => {
	value.marks.some((mark) => mark.type === 'italic')
}

const ControlButton = ({ value, onChange }) => (
	<span
		className={`${hasMark(value) ? 'active' : ''}`}
		onClick={(e) => onChange(toggleMark(value.change()))}
	>
		<Icon name="italic" />
	</span>
)

export default (options) => {
	return {
		changes: {
			toggleMark
		},
		components: {
			ControlButton
		},
		helpers: {
			hasMark
		},
		plugins: {
			renderMark: (props) => {
				const { children, mark, attributes } = props
				if (mark.type === 'italic') {
					return <i {...{ attributes }}>{children}</i>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'italic'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.toggleMark('italic')
				return true
			}
		}
	}
}
