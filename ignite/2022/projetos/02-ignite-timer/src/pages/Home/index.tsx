import { Play } from 'phosphor-react';

import { CountdownContainer, FormContainer, HomeContainer, Separator } from './styles';

export function Home() {
	return (
		<HomeContainer>
			<FormContainer id="task-form">
				<label htmlFor="task">Vou trabalhar em</label>
				<input id="task" />

				<label htmlFor="minutes-amount">durante</label>
				<input type="number" id="minutes-amount" />

				<span>minutos.</span>
			</FormContainer>

			<CountdownContainer>
				<span>0</span>
				<span>0</span>
				<Separator>:</Separator>
				<span>0</span>
				<span>0</span>
			</CountdownContainer>

			<button type="submit" form="task-form">
				<Play size={24} />
				Começar
			</button>
		</HomeContainer>
	);
}
