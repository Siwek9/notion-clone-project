export type ServerResponse<T = undefined> = {
    success: boolean;
    code: number;
    data: T;
};
