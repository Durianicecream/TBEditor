import React from 'react'
import Icon from './../../components/Icon'

const toggleMark = (change) => {
	return change.toggleMark('bold')
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'b'
}

const hasMark = () => {}

const ControlButton = ({ value, onChange }) => (
	<span
		className={`${hasMark(value) ? 'active' : ''}`}
		onClick={(e) => onChange(toggleMark(value.change()))}
	>
		<Icon name="bold" />
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
				if (mark.type === 'bold') {
					return <b {...attributes}>{children}</b>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'bold'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.toggleMark('bold')
				return true
			}
		}
	}
}
