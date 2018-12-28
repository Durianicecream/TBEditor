import React from 'react'
import Icon from './../../components/Icon'

const toggleStrike = (change) => {
	return change.toggleMark('strikethrough')
}

const ControlButton = ({ value, onChange }) => (
	<Icon
		className={`${hasStrike(value) ? 'active' : ''}`}
		name="strikethrough"
		onMouseDown={(e) => {
			e.preventDefault()
			onChange(toggleStrike(value.change()))
		}}
		tip="删除线"
	/>
)

const isHotKey = (event) => {
	return event.ctrlKey && event.key === '5'
}

const hasStrike = (value) => {
	return value.activeMarks.some((mark) => mark.type === 'strikethrough')
}

export default (options) => {
	return {
		changes: {
			toggleStrike
		},
		components: {
			ControlButton
		},
		helpers: {
			hasStrike
		},
		plugins: {
			renderMark: (props) => {
				const { children, mark, attributes } = props
				if (mark.type === 'strikethrough') {
					return <s {...attributes}>{children}</s>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'strikethrough'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.call(toggleStrike)
				return true
			}
		}
	}
}
