import React from 'react'
import Icon from '../../components/Icon'
import HtmlSerializer from '../../utils/Html'

const showPreview = (value) => {
	const html = HtmlSerializer.serialize(value)
	if (window.previewWindow) {
		window.previewWindow.close()
	}
	window.previewWindow = window.open('/')
	window.previewWindow.document.write(html)
	window.previewWindow.document.write(`
	<style>
		body {
			width: 900px;
			margin: 0 auto;
			padding: 40px;
		}

		img {
			max-width: 100%;
			margin: 1em auto;
			display: block;
		}

		blockquote {
			border-left: 2px solid #ddd;
			margin: 2em 0;
			padding-left: 10px;
			color: #aaa;
		}

		hr {
			margin: 2em 0;
			border: none;
			border-top: 1px solid #ddd;
		}
		p {
			marign 1em 0;
		}
	</style>
	`)
}

export default ({ value }) => (
	<Icon
		name="window-maximize"
		tip="预览"
		onClick={(e) => {
			showPreview(value)
		}}
	/>
)
