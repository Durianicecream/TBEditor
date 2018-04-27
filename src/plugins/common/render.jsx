renderMark = (props) => {
	const { children, mark } = props
	switch (mark.type) {
		case 'bold':
			return <b>{children}</b>
		case 'italic':
			return <i>{children}</i>
		case 'stroke':
			return <s>{children}</s>
	}
}
