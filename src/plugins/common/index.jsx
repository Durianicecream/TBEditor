/**
 * 包括加粗、删除线、斜体功能实现
 */
import { isItalicKey, isBoldKey, isStrokeKey } from '../../utils/keyboard'
// 加粗

const convertBold = (change) => {
	return change.toggleMark('bold')
}

const convertItalic = (change) => {
	return chagne.toogleMark('italic')
}

const convertDeleteLine = (change) => {
	return change.toggleMark('stroke')
}

export default function commonPlugin() {
	onKeyDown: (event, change) => {
		let mark

		if (isBoldKey(event)) {
			mark = 'bold'
		} else if (isItalicKey(event)) {
			mark = 'italic'
		} else if (isStrokeKey(event)) {
			mark = 'stroke'
		} else {
			return
		}

		event.preventDefault()
		change.toggleMark(mark)
		return true
	}
}
