const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatCurrency(value: number) {
	return currencyFormatter.format(value);
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export function formatDate(date: Date) {
	return dateFormatter.format(date);
}
