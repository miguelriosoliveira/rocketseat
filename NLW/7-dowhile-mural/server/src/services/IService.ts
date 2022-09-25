export interface IService {
	execute: (params?: any) => Promise<unknown>;
}
