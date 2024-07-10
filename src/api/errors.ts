import axios from 'axios';

export class ServerError extends Error {
    constructor(public statusCode: number, public responseBody: object) {
        super(`Error del servidor: ${statusCode} - ${JSON.stringify(responseBody)}`);
        this.name = 'ServerError';
    }
}

export class NoResponseError extends Error {
    constructor() {
        super('No se recibió respuesta del servidor.');
        this.name = 'NoResponseError';
    }
}

export class RequestConfigError extends Error {
    constructor(message: string) {
        super(`Error al configurar la solicitud: ${message}`);
        this.name = 'RequestConfigError';
    }
}

export class UnknownError extends Error {
    constructor(message: string) {
        super(`Error desconocido: ${message}`);
        this.name = 'UnknownError';
    }
}

export const handleError = (error: Error): never => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            throw new ServerError(error.response.status, error.response.data);
        } else if (error.request) {
            throw new NoResponseError();
        } else {
            throw new RequestConfigError(error.message);
        }
    } else {
        throw new UnknownError(error.message);
    }
};
