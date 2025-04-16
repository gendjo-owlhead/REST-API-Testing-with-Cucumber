export interface ApiResponse {
    status: number;
    data: any;
    message?: string;
}

export interface ApiRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    body?: any;
    headers?: Record<string, string>;
}