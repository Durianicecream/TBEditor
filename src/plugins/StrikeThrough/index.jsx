import React from 'react'
import Icon from './../../components/Icon'

const toggleMark = (change) => {
	return change.toggleMark('strike')
}

const ControlButton = ({ value, onChange }) => (
	<span
		className={`${hasMark(value) ? 'active' : ''}`}
		onClick={(e) => onChange(toggleMark(value.change()))}
	>
		<Icon name="strikethrough" />
	</span>
)

const isHotKey = (event) => {
	return event.ctrlKey && event.key === '5'
}

const hasMark = () => {}

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
				if (mark.type === 'strike') {
					return <s {...attributes}>{children}</s>
				}
			},
			onKeyDown: (event, change) => {
				const mark = 'strike'

				if (!isHotKey(event)) return
				event.preventDefault()
				change.toggleMark('strike')
				return true
			}
		}
	}
}
