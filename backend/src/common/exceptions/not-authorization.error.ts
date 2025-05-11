import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAuthorizationError extends HttpException {
  constructor(message = 'No autorizado') {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
