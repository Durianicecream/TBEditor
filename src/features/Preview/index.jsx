import React from 'react'
import Icon from '../../components/Icon'
import HtmlSerializer from '../../utils/Html'

const showPreview = (value) => {
	const html = HtmlSerializer.serialize(value)
	if (window.previewWindow) {
		window.previewWindow.close()
	}
	window.previewWindow = window.open('/')
	window.previewWindow.document.write(`
	<!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
    img{
      max-width:100%;
    }
    body{
      padding:12px 4%;
      margin:0;
    }
    p{
      line-height: 27px;
      font-size: 17px;
      color:#242529;
      margin: 12px 0;
      word-wrap:break-word;
      word-break:break-all;
    }
  </style>
  </head>
  <body>${html}</body>
	</html>
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
