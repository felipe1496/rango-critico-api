import { AppException } from "./AppException";

export class ConflictException extends AppException {
  constructor(message: string) {
    super(message, 409);
  }
}
