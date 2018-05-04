import React from 'react'

export default (options) => {
	return {
		plugins: {
			renderNode: (props) => {
				const { children, node, attributes } = props
				if (node.type === 'paragraph') {
					return <p {...attributes}>{children}</p>
				}
			}
		}
	}
}
