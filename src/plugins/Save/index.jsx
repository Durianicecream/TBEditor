import React from 'react'
import Icon from './../../components/Icon'

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

const ControlButton = ({ value, onChange }) => {
	return (
		<span>
			<Icon name="save" onClick={this.save} />
		</span>
	)
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
