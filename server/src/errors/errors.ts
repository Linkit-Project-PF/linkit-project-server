export class ConnectionError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ConnectionError'
  }
}

export class NotFoundError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class InternalServerError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InternalServerError'
  }
}

export class ServiceUnavailableError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ServiceUnavailableError'
  }
}
