interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_API_URL: string;
	readonly VITE_GITHUB_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
