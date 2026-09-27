class AppError extends Error{
    public readonly status: number
    public readonly code: string
    public readonly details: unknown
    public readonly isOperational: unknown

    constructor(
        message: string,
        {status = 500, code = "internal error", details, cause} : 
        {status?: number, code?: string, details?: unknown, cause?: unknown } = {}
    ) {
        super(message, {cause})
        this.name = new.target.name,
        this.status = status,
        this.code = code,
        this.details = details,
        this.isOperational = true
    }
}

class NotFoundError extends AppError{
    constructor (what = "Ресурс") {
        super(`${what} не найден`, {status: 404, code: "not found"})
    }
}

class ValidationError extends AppError{
}

class ConflictError extends AppError{
    constructor (message: string) {
        super(message, {status: 409, code: "conflict"})
    }
}

class TooManyRequestsError extends AppError{
    constructor() {
        super("Превышен лимит частоты запросов", {status: 429, code: "too many requests"})
    }
}

module.exports = {AppError,
NotFoundError,
ValidationError,
ConflictError,
TooManyRequestsError}
