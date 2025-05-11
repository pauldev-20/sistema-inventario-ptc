import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {
  constructor(private client: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, field] = args.constraints;
    const where = { [field]: value };
    const record = await (this.client as any)[model].findFirst({ where });
    return !!record;
  }

  defaultMessage(args: ValidationArguments) {
    const [model, field] = args.constraints;
    return `No exite un ${model} con el ${field} ${args.value}`;
  }
}

export function Exists(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [model, field],
      options: validationOptions,
      validator: ExistsValidator,
    });
  };
}
