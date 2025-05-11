import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject(PrismaService)
    private readonly client: PrismaService,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, field] = args.constraints;

    const where = { [field]: value };
    const record = await (this.client as any)[model].findFirst({ where });
    return !record;
  }

  defaultMessage(args: ValidationArguments) {
    const [model] = args.constraints;
    return `${args.value} ya existe en ${model}`;
  }
}

export function IsUnique(
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
      validator: IsUniqueValidator,
    });
  };
}
