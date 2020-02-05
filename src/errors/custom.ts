type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {},
    public log: boolean = false,
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(url: string) {
    super(`Route '${url}' does not exist.`, 'NOT_FOUND', 404);
  }
}

export class BadUserInputError extends CustomError {
  constructor(userData: ErrorData) {
    super('Validation error', 'BAD_USER_INPUT', 400, userData);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message: string = 'Authentication token is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(baseUrl: string, id: string) {
    super(`Entity '${id}' not found in collection '${baseUrl}'`, 'ENTITY_NOT_FOUND', 404);
  }
}