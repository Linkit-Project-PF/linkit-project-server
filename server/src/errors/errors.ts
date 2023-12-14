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

export interface customError {
  en: string
  es: string
}

export class ServerError extends Error {
  readonly en: string
  readonly es: string
  readonly code: number
  constructor (en: string, es: string, code: number) {
    super()
    this.en = en
    this.es = es
    this.code = code
  }

  public getError (): customError {
    return { en: this.en, es: this.es }
  }
}

export class UncatchedError extends Error {
  readonly en: string
  readonly es: string
  readonly code: number
  constructor (message: string, objen: string, objes: string) {
    super(message)
    this.en = `An unexpected error has occured ${objen}: ${message}`
    this.es = `Un error inesperado ha ocurrido al ${objes}: ${message}`
    this.code = 400
  }
}
