export function formatDate(date: Date) {
	return date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export function formatCurrency(value: number) {
	return currencyFormatter.format(value);
}
