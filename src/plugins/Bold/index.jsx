import React from 'react'
import Icon from './../../components/Icon'

const toggleBold = (change) => {
	return change.toggleMark('bold')
}

const isHotKey = (event) => {
	return event.ctrlKey && event.key === 'b'
}

const hasBold = (value) => {
	return value.activeMarks.some((mark) => mark.type === 'bold')
}

const ControlButton = ({ value, onChange }) => (
	<Icon
		className={`${hasBold(value) ? 'active' : ''}`}
		name="bold"
		onMouseDown={(e) => {
			e.preventDefault()
			onChange(toggleBold(value.change()))
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
				if (mark.type === 'bold') {
					return <b {...attributes}>{children}</b>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'bold'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.call(toggleBold)
				return true
			}
		}
	}
}
