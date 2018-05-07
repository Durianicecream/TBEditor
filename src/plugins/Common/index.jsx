import { Block } from 'slate'
import Html from 'slate-html-serializer'
import { getEventTransfer } from 'slate-react'

const BLOCK_TAGS = {
	p: 'paragraph',
	blockquote: 'quote',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	hr: 'hr'
}
const MARK_TAGS = {
	b: 'bold',
	strong: 'bold',
	i: 'italic',
	em: 'italic',
	s: 'strikethrough'
}

const RULES = [
	{
		deserialize(el, next) {
			const block = BLOCK_TAGS[el.tagName.toLowerCase()]
			if (block) {
				return {
					object: 'block',
					type: block,
					nodes: next(el.childNodes)
				}
			}
		}
	},
	{
		deserialize(el, next) {
			const mark = MARK_TAGS[el.tagName.toLowerCase()]
			if (mark) {
				return {
					object: 'mark',
					type: mark,
					nodes: next(el.childNodes)
				}
			}
		}
	},
	{
		deserialize(el, next) {
			if (el.tagName.toLowerCase() == 'img') {
				return {
					object: 'block',
					type: 'image',
					isVoid: true,
					nodes: next(el.childNodes),
					data: {
						src: el.getAttribute('src')
					}
				}
			}
		}
	},
	{
		deserialize(el, next) {
			if (el.tagName.toLowerCase() == 'a') {
				return {
					object: 'inline',
					type: 'link',
					nodes: next(el.childNodes),
					data: {
						href: el.getAttribute('href')
					}
				}
			}
		}
	}
]

const serializer = new Html({ rules: RULES })

export default (options) => {
	return {
		plugins: {
			schema: {
				document: {
					last: {
						types: 'paragraph'
					},
					marks: ['bold', 'italic', 'strike'],
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
				const { document } = serializer.deserialize(transfer.html)
				change.insertFragment(document)
				return true
			},
			onCopy: (event, change) => {
				const html = serializer.serialize(change.value)
				console.log(html)
			}
		}
	}
}
