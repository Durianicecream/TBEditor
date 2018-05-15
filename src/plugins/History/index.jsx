import React from 'react'
import Icon from './../../components/Icon'

const undo = (change) => {
	return change.undo()
}

const redo = (change) => {
	return change.redo()
}

const ControlButton = ({ value, onChange }) => (
	<span>
		<Icon
			name="undo"
			onClick={(e) => onChange(undo(value.change()))}
			tip="撤销"
		/>
		<Icon
			name="repeat"
			onClick={(e) => onChange(redo(value.change()))}
			tip="重做"
		/>
	</span>
)

const isUndoKey = (event) => {
	return event.ctrlKey && event.key === 'z'
}

const isRedoKey = (event) => {
	return (
		(event.ctrlKey && event.key === 'y') ||
		(event.ctrlKey && event.shiftKey && event.key === 'z')
	)
}

export default (options) => {
	return {
		changes: {
			undo,
			redo
		},
		components: {
			ControlButton
		},
		plugins: {}
	}
}
