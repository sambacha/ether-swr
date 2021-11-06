/**
 * @class ABIError
 */
export class ABIError extends Error {
  constructor(message: string) {
    super(message)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ABIError.prototype)
  }
}
/**
 * @class ABINotFound
 */
export class ABINotFound extends Error {
  constructor(message: string) {
    super(message)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ABINotFound.prototype)
  }
}
