import React from 'react'
import ReactDOM from 'react-dom'
import FungoEditor from '.././src'

class Demo extends React.Component {
	constructor() {
		super()
		this.state = {
			value: ''
		}
	}

	uploadProps = {
		name: 'image',
		action: '/api/upload/image'
	}

	onChange = (value) => {
		this.setState({ value })
	}

	render() {
		return (
			<FungoEditor
				onChange={this.onChange}
				uploadProps={this.uploadProps}
				defaultValue={this.state.value}
			/>
		)
	}
}

ReactDOM.render(<Demo />, document.getElementById('root'))
