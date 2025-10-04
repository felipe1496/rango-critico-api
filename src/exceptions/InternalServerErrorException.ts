import { AppException } from "./AppException";

export class InternalServerErrorException extends AppException {
  constructor(message: string) {
    super(message, 500);
  }
}
