import React from 'react'
import ReactDOM from 'react-dom'
import TbEditor from '../src/index'

class Demo extends React.Component {
	constructor() {
		super()
		this.state = {
			value: '',
			defaultValue: '随便输入点什么吧...😃'
		}
		this.uploadProps = {
			name: 'image',
			action: 'http://tuobing.leanapp.cn/api/upload/image'
		}
	}

	onChange = (value) => {
		this.setState({ value })
	}

	render() {
		return (
			<div
				style={{
					paddingTop: '60px',
					width: '1000px',
					margin: '0 auto'
				}}
			>
				<h3 style={{ marginBottom: 30 }}>
					Github 仓库地址：
					<a href="https://github.com/Durianicecream/tb-editor" target="_blank">
						https://github.com/Durianicecream/tb-editor
					</a>
				</h3>
				<TbEditor
					onChange={this.onChange}
					uploadProps={this.uploadProps}
					defaultValue={this.state.defaultValue}
				/>
				<div
					style={{
						padding: '30px 0'
					}}
				>
					<h1>HTML文本</h1>
					{this.state.value}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Demo />, document.getElementById('root'))
