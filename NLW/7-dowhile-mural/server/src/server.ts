import { httpServer } from './app';
import { logger } from './utils/logger';

interface IAddressInfo {
	address: string;
	port: number;
}

const PORT = process.env.PORT || 4000;

const server = httpServer.listen(PORT, () => {
	const { address, port } = server.address() as IAddressInfo;
	const addressParsed = address === '::' ? 'http://localhost' : address;
	logger.info(`🚀 Server running on ${addressParsed}:${port}`);
});
