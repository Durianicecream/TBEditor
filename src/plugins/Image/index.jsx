import React from 'react'
import { Modal, Upload } from 'antd'
import Icon from './../../components/Icon'
import './index.less'

const addBlock = (change, src) => {
	return change.insertBlock({
		type: 'image',
		isVoid: true,
		data: { src }
	})
}

const addBlocks = (change, imageList) => {
	imageList.forEach((item) => {
		change.insertBlock({
			type: 'image',
			isVoid: true,
			data: { src: item.response.data.url }
		})
	})
	return change
}

class ControlButton extends React.Component {
	constructor() {
		super()
		this.state = {
			modalVisible: false,
			fileList: []
		}
	}

	hideModal = (event) => {
		event.stopPropagation()

		this.setState({ modalVisible: false })
	}

	showModal = (event) => {
		this.setState({ modalVisible: true })
	}

	handleAddImage = (event) => {
		event.stopPropagation()

		const { value, onChange } = this.props
		const { fileList } = this.state
		onChange(addBlocks(value.change(), fileList))
		this.setState({ modalVisible: false, fileList: [] })
	}

	handleChange = ({ fileList }) => this.setState({ fileList })

	handlePreview = (file) => {
		window.open(file.response.data.url)
	}
	render() {
		return (
			<span onClick={this.showModal}>
				<Icon name="image" />
				<Modal
					onCancel={this.hideModal}
					onOk={this.handleAddImage}
					visible={this.state.modalVisible}
					title="添加图片"
				>
					<Upload
						action="/api/upload/image"
						name="image"
						listType="picture-card"
						fileList={this.state.fileList}
						onPreview={this.handlePreview}
						onChange={this.handleChange}
					>
						<div>
							<Icon name="plus" />
						</div>
					</Upload>
				</Modal>
			</span>
		)
	}
}

export default (options) => {
	return {
		changes: {
			addBlock
		},
		components: {
			ControlButton
		},
		plugins: {
			renderNode: (props) => {
				const { attributes, node, isSelected } = props
				const src = node.data.get('src')
				if (node.type === 'image') {
					return (
						<img
							{...attributes}
							className={`image ${isSelected ? 'selected' : ''}`}
							src={src}
						/>
					)
				}
			}
		}
	}
}
