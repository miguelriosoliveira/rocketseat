import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

import { HeaderContainer } from './styles';

export function Header() {
	return (
		<HeaderContainer>
			<img src="/ignite-logo.svg" alt="Logo do Ignite" />
			<nav>
				<NavLink end to="/" title="Timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	);
}
