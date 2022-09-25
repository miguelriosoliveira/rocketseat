import React from 'react';
import { Route as ReactDomRoute, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface Props extends RouteProps {
	isPrivate?: boolean;
	component: React.ComponentType;
}

const Route: React.FC<Props> = ({ isPrivate = false, component: Component, ...rest }) => {
	const { user } = useAuth();

	console.log(user, isPrivate);

	return (
		<ReactDomRoute
			{...rest}
			render={({ location }) => {
				return isPrivate === !!user ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: isPrivate ? '/' : '/dashboard',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
};

export default Route;
