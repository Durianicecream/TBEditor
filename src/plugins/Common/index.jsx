import React from 'react'
import { Block } from 'slate'
import HtmlSerializer from '../../utils/html'
import { getEventTransfer } from 'slate-react'

export default (options) => {
	return {
		plugins: {
			schema: {
				document: {
					last: {
						types: 'paragraph'
					},
					normalize: (editor, error) => {
						switch (error.code) {
							case 'last_child_type_invalid': {
								const paragraph = Block.create('paragraph')
								return editor.insertNodeByKey(
									context.node.key,
									context.node.nodes.size,
									paragraph
								)
							}
						}
					}
				}
			},
			onPaste: (event, editor, next) => {
				const transfer = getEventTransfer(event)
				if (transfer.type !== 'html') return next()
				const { document } = HtmlSerializer.deserialize(transfer.html)
				editor.insertFragment(document)
			},
			onCopy: (event, editor) => {
				const html = HtmlSerializer.serialize(editor.value)
			},
			renderNode: (props) => {
				const { children, node, attributes } = props
				if (node.type === 'paragraph') {
					return <p {...attributes}>{children}</p>
				}
			}
		}
	}
}
