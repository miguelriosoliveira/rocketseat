import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
	full_name: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
}

const Dashboard: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchError, setSearchError] = useState('');
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const storedRepositories = localStorage.getItem('@github-explorer:repositories');
		if (storedRepositories) {
			return JSON.parse(storedRepositories);
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem('@github-explorer:repositories', JSON.stringify(repositories));
	}, [repositories]);

	async function addRepository(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!search) {
			setSearchError('Busque pelo repositório com o formato <autor>/<repositório>');
			return;
		}

		try {
			const response = await api.get<Repository>(`repos/${search}`);
			setRepositories([...repositories, response.data]);
			setSearch('');
			setSearchError('');
		} catch (err) {
			setSearchError('Falha ao buscar repositório');
		}
	}

	return (
		<>
			<img src={logo} alt="Github Explorer icon" />

			<Title>Explore repositórios no GitHub</Title>

			<Form onSubmit={addRepository} hasError={!!searchError}>
				<input placeholder="Digite aqui" value={search} onChange={e => setSearch(e.target.value)} />
				<button type="submit">Buscar</button>
			</Form>

			{searchError && <Error>{searchError}</Error>}

			<Repositories>
				{repositories.map(repo => (
					<Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
						<img src={repo.owner.avatar_url} alt={repo.owner.login} />

						<div>
							<strong>{repo.full_name}</strong>
							<p>{repo.description}</p>
						</div>

						<FiChevronRight size={20} />
					</Link>
				))}
			</Repositories>
		</>
	);
};

export default Dashboard;
