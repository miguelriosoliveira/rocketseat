import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	TaskInput,
} from './styles';

const newCycleFormSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormSchema = zod.infer<typeof newCycleFormSchema>;

interface Cycle extends NewCycleFormSchema {
	id: string;
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [secondsPassed, setSecondsPassed] = useState(0);
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormSchema>({
		resolver: zodResolver(newCycleFormSchema),
		defaultValues: { task: '', minutesAmount: 0 },
	});

	function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormSchema) {
		const newCycle: Cycle = {
			id: Date.now().toString(),
			task,
			minutesAmount,
		};
		setCycles(state => [...state, newCycle]);
		setActiveCycleId(newCycle.id);
		reset();
	}

	const task = watch('task');
	const isSubmitDisabled = !task;
	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0;
	const minutes = Math.floor(currentSeconds * 60)
		.toString()
		.padStart(2, '0');
	const seconds = String(currentSeconds % 60).padStart(2, '0');

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
				<span>{minutes[0]}</span>
				<span>{minutes[1]}</span>
				<Separator>:</Separator>
				<span>{seconds[0]}</span>
				<span>{seconds[1]}</span>
			</CountdownContainer>

			<StartCountdownButton type="submit" form="task-form" disabled={isSubmitDisabled}>
				<Play size={24} />
				Começar
			</StartCountdownButton>
		</HomeContainer>
	);
}
