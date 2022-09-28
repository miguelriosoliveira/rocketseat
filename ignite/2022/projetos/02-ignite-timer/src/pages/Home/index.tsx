import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';

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
	const { register, handleSubmit, watch } = useForm();
	const task = watch('task');
	const isSubmitDisabled = !task;

	function handleCreateNewCycle(data) {
		console.log(data);
	}

	return (
		<HomeContainer>
			<FormContainer id="task-form" onSubmit={handleSubmit(handleCreateNewCycle)}>
				<label htmlFor="task">Vou trabalhar em</label>
				<TaskInput
					id="task"
					list="task-suggestions"
					placeholder="Dê um nome para o seu projeto"
					{...register('task')}
				/>

				<datalist id="task-suggestions">
					<option value="projeto 1" />
					<option value="projeto 2" />
					<option value="projeto 3" />
					<option value="banana" />
				</datalist>

				<label htmlFor="minutesAmount">durante</label>
				<MinutesAmountInput
					type="number"
					id="minutesAmount"
					placeholder="00"
					step={5}
					min={5}
					max={60}
					{...register('minutesAmount', { valueAsNumber: true })}
				/>

				<span>minutos.</span>
			</FormContainer>

			<CountdownContainer>
				<span>0</span>
				<span>0</span>
				<Separator>:</Separator>
				<span>0</span>
				<span>0</span>
			</CountdownContainer>

			<StartCountdownButton type="submit" form="task-form" disabled={isSubmitDisabled}>
				<Play size={24} />
				Começar
			</StartCountdownButton>
		</HomeContainer>
	);
}
