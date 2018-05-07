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
		<span onClick={(e) => onChange(undo(value.change()))}>
			<Icon name="undo" />
		</span>
		<span onClick={(e) => onChange(redo(value.change()))}>
			<Icon name="repeat" />
		</span>
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
