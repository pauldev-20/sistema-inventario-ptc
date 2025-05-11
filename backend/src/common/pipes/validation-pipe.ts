import { ValidationPipe, ValidationError } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export function validationPipe() {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[]) => {
      const errors = {};

      validationErrors.forEach((error) => {
        const field = error.property;
        const constraints = Object.values(error.constraints || {});

        if (!errors[field]) {
          errors[field] = [];
        }

        errors[field].push(...constraints);
      });

      return new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors,
      });
    },
  });
}
