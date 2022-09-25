export interface IService {
	execute(data: unknown): Promise<unknown>;
}
