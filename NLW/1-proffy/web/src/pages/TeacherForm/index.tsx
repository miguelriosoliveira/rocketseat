import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

import './styles.css';

interface ScheduleItem {
	week_day: string;
	from: string;
	to: string;
}

const TeacherForm: React.FC = () => {
	const history = useHistory();
	const [formData, setFormData] = useState({
		name: '',
		avatar: '',
		whatsapp: '',
		bio: '',
		subject: '',
		cost: '',
	});

	const [schedule, setSchedule] = useState<ScheduleItem[]>([{ week_day: '', from: '', to: '' }]);

	function addNewScheduleItem(): void {
		setSchedule([...schedule, { week_day: '', from: '', to: '' }]);
	}

	function handleChange({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
		setFormData({ ...formData, [name]: value });
	}

	function setScheduleItemValue(position: number, name: string, value: string): void {
		const updatedSchedule = schedule.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [name]: value };
			}
			return scheduleItem;
		});

		setSchedule(updatedSchedule);
	}

	async function handleSubmit(event: FormEvent): Promise<void> {
		event.preventDefault();
		try {
			await api.post('classes', { ...formData, schedule });
			alert('Cadastro realizado com sucesso!');
			history.push('/');
		} catch (error) {
			alert('Erro no cadastro!');
		}
	}

	return (
		<div id="page-teacher-form" className="container">
			<PageHeader
				title="Que incrível que você quer dar aulas!"
				description="O primeiro passo é preencher esse formulário de incrição"
			/>

			<main>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Seus dados</legend>
						<Input
							name="name"
							label="Nome completo"
							value={formData.name}
							onChange={handleChange}
						/>
						<Input name="avatar" label="Avatar" value={formData.avatar} onChange={handleChange} />
						<Input
							name="whatsapp"
							label="WhatsApp"
							value={formData.whatsapp}
							onChange={handleChange}
						/>
						<Textarea name="bio" label="Biografia" value={formData.bio} onChange={handleChange} />
					</fieldset>

					<fieldset>
						<legend>Seus dados</legend>
						<Select
							name="subject"
							label="Matéria"
							options={[
								{ value: 'Artes', label: 'Artes' },
								{ value: 'Biologia', label: 'Biologia' },
								{ value: 'Ciências', label: 'Ciências' },
								{ value: 'Educação física', label: 'Educação física' },
								{ value: 'Física', label: 'Física' },
								{ value: 'Geografia', label: 'Geografia' },
								{ value: 'História', label: 'História' },
								{ value: 'Matemática', label: 'Matemática' },
								{ value: 'Português', label: 'Português' },
								{ value: 'Química', label: 'Química' },
							]}
							value={formData.subject}
							onChange={handleChange}
						/>
						<Input
							name="cost"
							label="Custo da sua hora por aula"
							value={formData.cost}
							onChange={handleChange}
						/>
					</fieldset>

					<fieldset>
						<legend>
							Horários disponíveis
							<button type="button" onClick={addNewScheduleItem}>
								+ Novo horário
							</button>
						</legend>

						{schedule.map((scheduleItem, index) => (
							<div key={scheduleItem.week_day} className="schedule-item">
								<Select
									name="week_day"
									label="Dia da semana"
									options={[
										{ value: '0', label: 'Domingo' },
										{ value: '1', label: 'Segunda-feira' },
										{ value: '2', label: 'Terça-feira' },
										{ value: '3', label: 'Quarta-feira' },
										{ value: '4', label: 'Quinta-feira' },
										{ value: '5', label: 'Sexta-feira' },
										{ value: '6', label: 'Sábado' },
									]}
									value={scheduleItem.week_day}
									onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
								/>
								<Input
									type="time"
									name="from"
									label="Das"
									value={scheduleItem.from}
									onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
								/>
								<Input
									type="time"
									name="to"
									label="Até"
									value={scheduleItem.to}
									onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
								/>
							</div>
						))}
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante!
							<br />
							Preencha todos os dados
						</p>
						<button type="submit">Salvar cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
};

export default TeacherForm;
