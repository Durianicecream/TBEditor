import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './App.less'
import './public/icons/font-awesome.css'
import Toolbar from './components/ToolBar'
import plugins from './plugins'

export default class FungoEditor extends React.Component {
	constructor() {
		super()
		this.state = {
			value: Value.fromJSON({
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
											text: 'This is editable '
										},
										{
											text: 'rich',
											marks: [
												{
													type: 'bold'
												}
											]
										},
										{
											text: ' text, '
										},
										{
											text: 'much',
											marks: [
												{
													type: 'italic'
												}
											]
										},
										{
											text: ' better than a '
										},
										{
											text: '<textarea>',
											marks: [
												{
													type: 'code'
												}
											]
										},
										{
											text: '!'
										}
									]
								}
							]
						},
						{
							object: 'block',
							type: 'paragraph',
							nodes: [
								{
									object: 'text',
									leaves: [
										{
											text:
												"Since it's rich text, you can do things like turn a selection of text "
										},
										{
											text: 'bold',
											marks: [
												{
													type: 'bold'
												}
											]
										},
										{
											text:
												', or add a semantically rendered block quote in the middle of the page, like this:'
										}
									]
								}
							]
						},
						{
							object: 'block',
							type: 'block-quote',
							nodes: [
								{
									object: 'text',
									leaves: [
										{
											text: 'A wise quote.'
										}
									]
								}
							]
						},
						{
							object: 'block',
							type: 'paragraph',
							nodes: [
								{
									object: 'text',
									leaves: [
										{
											text: 'Try it out for yourself!'
										}
									]
								}
							]
						}
					]
				}
			})
		}
	}

	onChange = ({ value }) => {
		this.setState({ value })
	}

	render() {
		return (
			<div className="fungo-editor">
				<Toolbar />
				<Editor
					plugins={plugins}
					className="fungo-contenteditable"
					value={this.state.value}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}
