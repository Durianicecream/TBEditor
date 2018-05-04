import React from 'react'
import { Modal } from 'antd'
import Icon from './../../components/Icon'

const addMark = (change, href) => {
	return change.wrapInline({
		type: 'link',
		data: { href }
	})
	change.collapseToEnd()
}

const removeMark = (change) => {
	return change.unwrapInline('link')
}

const hasMark = (value) => {
	return value.inlines.some((inline) => inline.type == 'link')
}

const ControlButton = ({ value, onChange }) => (
	<span className={`${hasMark(value) ? 'active' : ''}`}>
		<Icon name="image" />
	</span>
)

export default (options) => {
	return {
		changes: {
			addMark,
			removeMark
		},
		components: {
			ControlButton
		},
		helpers: {
			hasMark
		},
		plugins: {
			renderNode: (props) => {
				const { attributes, children, node } = props
				const href = node.get('href')
				return (
					<a {...attributes} href={href}>
						{children}
					</a>
				)
			}
		}
	}
}
