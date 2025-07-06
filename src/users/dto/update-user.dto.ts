import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';

/**
 * DTO for updating a user.
 * All fields are optional and Swagger-ready.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'newemail@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'newPassword123' })
  password?: string;

  @ApiPropertyOptional({ example: 'Updated Name' })
  name?: string;

  @ApiPropertyOptional({ enum: Role, example: 'admin' })
  role?: Role;
}
