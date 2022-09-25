/* eslint-disable @typescript-eslint/naming-convention */

declare namespace NodeJS {
	export interface ProcessEnv {
		PORT?: number;
		JWT_SECRET: string;

		GITHUB_CLIENT_ID_SERVER: string;
		GITHUB_CLIENT_SECRET_SERVER: string;

		GITHUB_CLIENT_ID_WEB: string;
		GITHUB_CLIENT_SECRET_WEB: string;

		GITHUB_CLIENT_ID_MOBILE: string;
		GITHUB_CLIENT_SECRET_MOBILE: string;
	}
	interface Process {
		env: ProcessEnv;
	}
}
