import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface TeacherProps {
	id: number;
	subject: string;
	cost: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

interface Props {
	teacher: TeacherProps;
}

const TeacherItem: React.FC<Props> = ({
	teacher: { id, avatar, name, subject, bio, cost, whatsapp },
}) => {
	function createNewConnection(): void {
		api.post('connections', { user_id: id });
	}

	return (
		<article className="teacher-item">
			<header>
				<img src={avatar} alt={name} />
				<div>
					<strong>{name}</strong>
					<span>{subject}</span>
				</div>
			</header>

			<p>{bio}</p>

			<footer>
				<p>
					Preço/hora
					<strong>
						R$
						{` ${cost}`}
					</strong>
				</p>
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://wa.me/${whatsapp}`}
					onClick={createNewConnection}
				>
					<img src={whatsappIcon} alt="WhatsApp" />
					Entrar em contato
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
