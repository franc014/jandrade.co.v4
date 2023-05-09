export function formatDate(date) {
	return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
		.format(
			new Date(date)
		)
}