import React from 'react'
import { Modal, Input } from 'antd'
import Icon from './../../components/Icon'

const addMark = (change, href) => {
	return change
		.wrapInline({
			type: 'link',
			data: { href }
		})
		.collapseToEnd()
}

const removeMark = (change) => {
	return change.unwrapInline('link')
}

const hasMark = (value) => {
	return value.inlines.some((inline) => inline.type == 'link')
}

class ControlButton extends React.Component {
	constructor() {
		super()
		this.state = {
			modalVisible: false,
			url: ''
		}
	}
	showModal = (event) => {
		const { value, onChange } = this.props
		const change = value.change()
		const href = this.state.href
		if (hasMark(value)) {
			change.call(removeMark)
		} else if (value.isExpanded) {
			this.setState({ modalVisible: true })
		}
	}
	hideModal = (event) => {
		event.stopPropagation()
		this.setState({ modalVisible: false })
	}
	handleKeyUp = (e) => {
		const value = e.target.value
		this.setState({ url: value })
	}
	handleLink = (event) => {
		event.stopPropagation()
		const { value, onChange } = this.props
		const change = value.change()
		const url = this.state.url
		this.setState({ modalVisible: false })
		onChange(addMark(change, url))
	}
	render() {
		return (
			<span onClick={this.showModal}>
				<Icon name="chain" />
				<Modal
					onCancel={this.hideModal}
					onOk={this.handleLink}
					visible={this.state.modalVisible}
					title="请填写链接"
				>
					<Input onChange={this.handleKeyUp} value={this.state.url} />
				</Modal>
			</span>
		)
	}
}

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
				const href = node.data.get('href')
				if (node.type === 'link') {
					return (
						<a {...attributes} href={href}>
							{children}
						</a>
					)
				}
			}
		}
	}
}
