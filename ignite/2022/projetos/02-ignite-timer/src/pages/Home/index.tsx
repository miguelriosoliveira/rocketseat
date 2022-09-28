import { Play } from 'phosphor-react';

import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	TaskInput,
} from './styles';

export function Home() {
	return (
		<HomeContainer>
			<FormContainer id="task-form">
				<label htmlFor="task">Vou trabalhar em</label>
				<TaskInput id="task" placeholder="Dê um nome para o seu projeto" />

				<label htmlFor="minutes-amount">durante</label>
				<MinutesAmountInput type="number" id="minutes-amount" placeholder="00" />

				<span>minutos.</span>
			</FormContainer>

			<CountdownContainer>
				<span>0</span>
				<span>0</span>
				<Separator>:</Separator>
				<span>0</span>
				<span>0</span>
			</CountdownContainer>

			<StartCountdownButton type="submit" form="task-form">
				<Play size={24} />
				Começar
			</StartCountdownButton>
		</HomeContainer>
	);
}
