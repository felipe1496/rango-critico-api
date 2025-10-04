import { errors } from "../constants/errors";

export class AppException extends Error {
  public readonly isAppException = true;
  public readonly status: number;
  public error: string;

  constructor(message: string, status: keyof typeof errors = 500) {
    super(message);
    this.error = errors[status];
    this.status = status;
  }

  toJSON() {
    const json = {
      status: this.status,
      error: this.error,
      message: this.message,
      stack: this.stack,
    };

    return json;
  }
}
