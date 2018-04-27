import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './App.css'

const existingState = JSON.parse(localStorage.getItem('content'))
const initialValue = Value.fromJSON(
	existingState || {
		document: {
			nodes: [
				{
					object: 'block',
					type: 'paragraph',
					nodes: [
						{
							object: 'text',
							leaves: [
								{
									text: 'A line of text in a paragraph.'
								}
							]
						}
					]
				}
			]
		}
	}
)

// 为代码块定义 React 组件以作为 renderer。
function CodeNode(props) {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	)
}

// 渲染粗体字
function BoldMark(props) {
	return <strong>{props.children}</strong>
}

// Define our app...
export default class App extends React.Component {
	// Set the initial value when the app is first constructed.
	constructor() {
		super()
		this.state = {
			value: initialValue,
			schema: {
				nodes: {
					code: CodeNode
				}
			}
		}
	}

	// On change, update the app's React state with the new editor value.
	onChange = ({ value }) => {
		const content = JSON.stringify(value.toJSON())
		localStorage.setItem('content', content)
		this.setState({ value })
	}

	onKeyDown = (event, change) => {
		if (!event.ctrlKey) return

		// Decide what to do based on the key code...
		switch (event.key) {
			// When "B" is pressed, add a "bold" mark to the text.
			case 'b': {
				console.log('222')
				event.preventDefault()
				change.toggleMark('bold')
				return true
			}
			// When "`" is pressed, keep our existing code block logic.
			case '`': {
				const isCode = change.value.blocks.some(
					(block) => block.type === 'code'
				)
				event.preventDefault()
				change.setBlocks(isCode ? 'paragraph' : 'code')
				return true
			}
			default:
				return
		}
	}

	renderNode = (props) => {
		switch (props.node.type) {
			case 'code':
				return <CodeNode {...props} />
			default:
				return
		}
	}

	renderMark = (props) => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />
			default:
				return
		}
	}

	// Render the editor.
	render() {
		return (
			<Editor
				className="fungo-editor"
				renderNode={this.renderNode}
				value={this.state.value}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				renderMark={this.renderMark}
			/>
		)
	}
}
