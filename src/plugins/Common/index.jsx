import React from 'react'
import { Block } from 'slate'
import HtmlSerializer from '../../utils/Html'
import { getEventTransfer } from 'slate-react'

export default (options) => {
	return {
		plugins: {
			schema: {
				document: {
					last: {
						types: 'paragraph'
					},
					normalize: (change, violation, context) => {
						switch (violation) {
							case 'last_child_type_invalid': {
								const paragraph = Block.create('paragraph')
								return change.insertNodeByKey(
									context.node.key,
									context.node.nodes.size,
									paragraph
								)
							}
						}
					}
				}
			},
			onPaste: (event, change) => {
				const transfer = getEventTransfer(event)
				if (transfer.type !== 'html') return
				const { document } = HtmlSerializer.deserialize(transfer.html)
				change.insertFragment(document)
				return true
			},
			onCopy: (event, change) => {
				const html = HtmlSerializer.serialize(change.value)
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
