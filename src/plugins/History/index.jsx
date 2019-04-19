import React from 'react'
import Icon from './../../components/Icon'

const ControlButton = ({ editor, onChange }) => (
	<span>
		<Icon name="undo" onClick={(e) => onChange(editor.undo())} tip="撤销" />
		<Icon name="repeat" onClick={(e) => onChange(editor.rede())} tip="重做" />
	</span>
)

export default (options) => {
	return {
		changes: {
			undo,
			redo
		},
		components: {
			ControlButton
		}
	}
}
