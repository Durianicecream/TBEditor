import Html from 'slate-html-serializer'
import React from 'react'

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
			const tagName = el.tagName.toLowerCase()
			if (tagName === 'img') {
				return {
					object: 'block',
					type: 'image',
					isVoid: true,
					nodes: next(el.childNodes),
					data: {
						src: el.getAttribute('src')
					}
				}
			} else if (tagName === 'a') {
				return {
					object: 'inline',
					type: 'link',
					nodes: next(el.childNodes),
					data: {
						href: el.getAttribute('href')
					}
				}
			} else if (BLOCK_TAGS[tagName]) {
				return {
					object: 'block',
					type: BLOCK_TAGS[tagName],
					nodes: next(el.childNodes)
				}
			} else if (MARK_TAGS[tagName]) {
				return {
					object: 'mark',
					type: MARK_TAGS[tagName],
					nodes: next(el.childNodes)
				}
			}
		},
		serialize(obj, children) {
			switch (obj.type) {
				case 'paragraph':
					return React.createElement('p', {}, children)
				case 'hr':
					return <hr />
				case 'h1':
					return React.createElement('h1', {}, children)
				case 'h2':
					return React.createElement('h2', {}, children)
				case 'h3':
					return React.createElement('h3', {}, children)
				case 'quote':
					return React.createElement('quote', {}, children)
				case 'bold':
					return React.createElement('b', {}, children)
				case 'italic':
					return React.createElement('i', {}, children)
				case 'strike':
					return React.createElement('s', {}, children)
				case 'image':
					return <img src={obj.data.get('src')} />
				case 'link':
					return React.createElement('a', {}, children)
			}
		}
	}
]

const serializer = new Html({
	rules: RULES,
	defaultBlock: 'paragraph'
})

export default serializer
