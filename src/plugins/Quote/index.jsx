import React from 'react'
import Icon from '../.././components/Icon'

const toggleQuote = (value) => {
	const change = value.change()
	return change
		.setBlocks(hasQuote(value) ? 'paragraph' : 'quote')
		.setBlocks({ isVoid: false })
		.focus()
}

const hasQuote = (value) => {
	return value.blocks.some((node) => node.type == 'quote')
}

const isContinuousBr = (value) => {
	const regExp = /\n$/
	return regExp.test(value.endText.text)
}

const ControlButton = ({ value, onChange }) => (
	<Icon
		className={`${hasQuote(value) ? 'active' : ''}`}
		name="quote-left"
		onClick={(e) => onChange(toggleQuote(value))}
		tip="引用"
	/>
)

export default (options) => {
	return {
		changes: {
			toggleQuote
		},
		components: {
			ControlButton
		},
		helpers: {
			hasQuote
		},
		plugins: {
			renderNode: (props) => {
				const { children, node, attributes } = props
				if (node.type === 'quote') {
					return <blockquote {...attributes}>{children}</blockquote>
				}
			},
			onKeyDown: (event, change) => {
				if (event.keyCode !== 13) return
				if (!hasQuote(change.value)) return
				// 如果是连续插入换行,则不处理
				if (isContinuousBr(change.value)) {
					change.deleteBackward()
					return
				}
				change.insertText('\n')
				return true
			}
		}
	}
}
