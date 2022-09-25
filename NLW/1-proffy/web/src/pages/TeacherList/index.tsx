import React, { useState, ChangeEvent, FormEvent } from 'react';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';
import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
	const [formData, setFormData] = useState({
		subject: '',
		week_day: '',
		time: '',
	});
	const [proffys, setProffys] = useState<TeacherProps[]>([]);

	function handleChange({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(event: FormEvent): Promise<void> {
		event.preventDefault();
		try {
			const { data } = await api.get('classes', { params: formData });
			setProffys(data);
		} catch (error) {
			alert('Erro na busca!');
		}
	}

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis">
				<form id="search-teachers" onSubmit={handleSubmit}>
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
						value={formData.week_day}
						onChange={handleChange}
					/>

					<Input
						type="time"
						name="time"
						label="Horário"
						value={formData.time}
						onChange={handleChange}
					/>

					<button type="submit">Buscar</button>
				</form>
			</PageHeader>

			<main>
				{proffys.map(proffy => (
					<TeacherItem key={proffy.id} teacher={proffy} />
				))}
			</main>
		</div>
	);
};

export default TeacherList;
