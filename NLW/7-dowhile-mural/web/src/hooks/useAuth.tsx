import { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services';

interface User {
	id: string;
	name: string;
	github_id: string;
	avatar_url: string;
	login: string;
}

interface AuthProviderData {
	user: User | null;
	signInUrl: string;
	signOut: () => void;
}

export const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthenticationResponse {
	token: string;
	user: User;
}

interface AuthenticationResponseError {
	status: string;
	message: string;
}

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export function AuthProvider({ children }: AuthProviderProps) {
	const notifyError = (message: string) => toast.error(message, { theme: 'colored' });
	const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}`;

	const [user, setUser] = useState<User | null>(null);

	function signOut() {
		setUser(null);
		localStorage.remove('@doWhile:token');
	}

	const signIn = useCallback(async (githubCode: string) => {
		try {
			const { data } = await api.post<AuthenticationResponse>('/authenticate', {
				code: githubCode,
				client_type: 'web',
			});
			const { token, user: userData } = data;
			localStorage.setItem('@doWhile:token', token);
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
			setUser(userData);
		} catch (error) {
			const axiosError = error as AxiosError<AuthenticationResponseError>;
			notifyError(axiosError.response?.data.message as string);
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('@doWhile:token');
		if (token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
			api.get<User>('/profile').then(response => setUser(response.data));
		}
	}, []);

	useEffect(() => {
		const url = window.location.href;
		const hasGithubCode = url.includes('?code=');
		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split('?code=');
			window.history.pushState({}, '', urlWithoutCode);
			signIn(githubCode);
		}
	}, [signIn]);

	return (
		<AuthContext.Provider value={{ user, signInUrl, signOut }}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
