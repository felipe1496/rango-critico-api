import { AppException } from "./AppException";

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, 400);
  }
}
