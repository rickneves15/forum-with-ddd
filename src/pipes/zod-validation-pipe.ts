import { BadRequestException, type PipeTransform } from '@nestjs/common'
import { ZodError, type z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }

    return value
  }
}
