import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface User {
	id: string;
	avatar_url: string;
	name: string;
	login: string;
}

interface AuthContextProps {
	user: User | null;
	isLogging: boolean;
	signIn: () => Promise<void>;
	signOut: () => void;
}

interface AuthResponse {
	token: string;
	user: User;
}

interface GithubAuthorizationResponse {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
	children: ReactNode;
}

const { GITHUB_CLIENT_ID } = process.env;
const USER_STORAGE_KEY = '@nlwHeat:user';
const TOKEN_STORAGE_KEY = '@nlwHeat:token';

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLogging, setIsLogging] = useState(true);

	useEffect(() => {
		Promise.all([
			AsyncStorage.getItem(USER_STORAGE_KEY),
			AsyncStorage.getItem(TOKEN_STORAGE_KEY),
		]).then(([storedUser, storedToken]) => {
			if (storedUser && storedToken) {
				api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
				setUser(JSON.parse(storedUser));
			}
			setIsLogging(false);
		});
	}, []);

	async function signIn() {
		try {
			setIsLogging(true);
			const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${GITHUB_CLIENT_ID}`;
			const {
				type: authResponseType,
				params: { code: authResponseCode, error: authResponseError },
			} = (await AuthSessions.startAsync({
				authUrl,
			})) as GithubAuthorizationResponse;
			if (authResponseType === 'success' && authResponseError !== 'access_denied') {
				const { data: authResponse } = await api.post<AuthResponse>('/authenticate', {
					code: authResponseCode,
					client_type: 'mobile',
				});
				const { token, user: userData } = authResponse;
				api.defaults.headers.common.Authorization = `Bearer ${token}`;
				setUser(userData);
				await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
				await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
			}
		} catch (error) {
			console.log('Failed during sign in:', error);
		} finally {
			setIsLogging(false);
		}
	}

	function signOut() {
		setUser(null);
		AsyncStorage.removeItem(USER_STORAGE_KEY);
		AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
	}

	return (
		<AuthContext.Provider value={{ user, isLogging, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
