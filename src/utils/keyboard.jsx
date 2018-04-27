/*
 * 键盘事件判断工具类 
 */

const isBoldKey = (event) => {
	return (event.key = 'b' && event.ctrlKey)
}
const isItalicKey = (event) => {
	return (event.key = 'i' && event.ctrlKey)
}
const isStrokeKey = (event) => {
	return (event.key = 'n' && event.ctrlKey)
}
export { isBoldKey, isItalicKey, isStrokeKey }
