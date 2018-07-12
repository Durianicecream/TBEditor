import React from 'react'
import { Modal, Upload, message } from 'antd'
import Icon from './../../components/Icon'

const addImage = (change, src) => {
	try {
		change.insertBlock({
			type: 'image',
			isVoid: true,
			data: { src }
		})
	} catch (err) {
		message.error('插入失败')
	}
	return change
}

const addImages = (change, imageList) => {
	try {
		imageList.forEach((item) => {
			change.insertBlock({
				type: 'image',
				isVoid: true,
				data: { src: item.response.data.url }
			})
		})
	} catch (err) {
		message.error('插入失败')
	}
	return change
}

class ControlButton extends React.Component {
	constructor() {
		super()
		this.state = {
			modalVisible: false,
			fileList: [],
			loading: false
		}
	}

	hideModal = (event) => {
		this.setState({ modalVisible: false })
	}

	showModal = (event) => {
		this.setState({ modalVisible: true })
	}

	handleAddImage = (event) => {
		const { value, onChange } = this.props
		const { fileList } = this.state
		const isUploading = fileList.some((item) => item.status === 'uploading')
		if (isUploading) {
			message.error('请等待上传完成')
			return
		}
		const imageList = fileList.filter((item) => item.status === 'done')
		onChange(addImages(value.change(), imageList))
		this.setState({ modalVisible: false, fileList: [] })
	}

	handleChange = ({ fileList }) => this.setState({ fileList })

	handlePreview = (file) => {
		window.open(file.response.data.url)
	}
	render() {
		const { uploadProps } = this.props
		return (
			<span>
				<Icon name="image" onClick={this.showModal} tip="图片" />
				<Modal
					onCancel={this.hideModal}
					onOk={this.handleAddImage}
					visible={this.state.modalVisible}
					confirmLoading={this.state.loading}
					title="添加图片"
				>
					<Upload
						{...uploadProps}
						listType="picture-card"
						fileList={this.state.fileList}
						onPreview={this.handlePreview}
						onChange={this.handleChange}
						showUploadList={{
							showPreviewIcon: false,
							showRemoveIcon: true
						}}
						multiple
					>
						<div>
							<i className="fa fa-plus" />
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
			addImage
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
