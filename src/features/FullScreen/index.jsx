import React from 'react'
import Icon from '../../components/Icon'
import HtmlSerializer from '../../utils/Html'

export default ({ isFullScreen, onChange }) => (
	<Icon
		style={{ float: 'right' }}
		name={`${isFullScreen ? 'compress' : 'expand'}`}
		tip={`${isFullScreen ? '退出' : ''}全屏`}
		onClick={(e) => onChange(!isFullScreen)}
	/>
)
