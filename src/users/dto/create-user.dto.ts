import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

/**
 * DTO for creating a user.
 * Validates email, password, name and optional role.
 */
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'role must be either user or admin' })
  role?: Role;
}
