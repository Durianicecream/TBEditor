import React from 'react'
import { Modal, Input, Select, message } from 'antd'
import Icon from './../../components/Icon'

const addLink = (change, href) => {
	return change
		.wrapInline({
			type: 'link',
			data: { href }
		})
		.collapseToEnd()
}

const removeLink = (change) => {
	return change.unwrapInline('link')
}

const hasLink = (value) => {
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
		if (hasLink(value)) {
			change.call(removeLink)
		} else if (!value.isExpanded) {
			message.error('请选择需要链接的文本')
		} else {
			this.setState({ modalVisible: true })
		}
	}
	hideModal = (event) => {
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
		this.setState({ modalVisible: false })
		onChange(addLink(change, url))
	}
	render() {
		const Option = Select.Option
		const { value } = this.props
		return (
			<span>
				<Icon
					className={`${hasLink(value) ? 'active' : ''}`}
					name="chain"
					onClick={this.showModal}
					tip={'链接'}
				/>
				<Modal
					onCancel={this.hideModal}
					onOk={this.handleLink}
					visible={this.state.modalVisible}
					title="请填写链接"
				>
					<Input
						addonBefore={
							<Select defaultValue="http://" style={{ width: 90 }}>
								<Option value="http://">http://</Option>
								<Option value="https://">https://</Option>
							</Select>
						}
						onChange={this.handleKeyUp}
						value={this.state.url}
					/>
				</Modal>
			</span>
		)
	}
}

export default (options) => {
	return {
		changes: {
			addLink,
			removeLink
		},
		components: {
			ControlButton
		},
		helpers: {
			hasLink
		},
		plugins: {
			renderNode: (props) => {
				const { attributes, children, node } = props
				if (node.type === 'link') {
					const href = node.data.get('href')
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
