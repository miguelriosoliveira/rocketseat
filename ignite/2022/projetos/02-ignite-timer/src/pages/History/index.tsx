import { HistoryContainer, Status, TableContainer } from './styles';

export function History() {
	return (
		<HistoryContainer>
			<h1>Meu Histórico</h1>

			<TableContainer>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="done">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="inProgress">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="interrupted">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="done">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="done">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 Minutos</td>
							<td>Há cerca de 2h</td>
							<td>
								<Status status="done">Concluído</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</TableContainer>
		</HistoryContainer>
	);
}
