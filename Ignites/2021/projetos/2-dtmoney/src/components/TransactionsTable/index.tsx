import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency, formatDate } from '../../utils/formatter';

import { Container } from './styles';

export function TransactionTable() {
	const { transactions } = useTransactions();

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>

				<tbody>
					{transactions.length === 0 ? (
						<tr>
							<td colSpan={4} className="no-data">
								Não há nenhuma transação cadastrada!
							</td>
						</tr>
					) : (
						transactions.map(({ id, title, amount, type, category, createdAt }) => (
							<tr key={id}>
								<td>{title}</td>
								<td className={type}>{formatCurrency(type === 'withdraw' ? -amount : amount)}</td>
								<td>{category}</td>
								<td>{formatDate(new Date(createdAt))}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</Container>
	);
}
