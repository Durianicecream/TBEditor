import React from 'react'
import { Modal, Input } from 'antd'
import Icon from './../../components/Icon'

const addMark = (change, href) => {
	console.log(href)
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
	showModal = () => {
		const { value, onChange } = this.props
		const change = value.change()
		const href = this.state.href
		if (hasMark(value)) {
			change.call(removeMark)
		} else if (value.isExpanded) {
			this.setState({ modalVisible: true })
		}
	}
	hideModal = () => {
		this.setState({ modalVisible: false })
	}
	handleKeyUp = (e) => {
		const value = e.target.value
		this.setState({ url: value })
	}
	handleLink = (event) => {
		const { value, onChange } = this.props
		const change = value.change()
		const url = this.state.url

		onChange(addMark(change, url))
		this.setState({ modalVisible: false })
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
