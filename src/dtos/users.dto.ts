import { IsEmail, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsIn(['admin', 'manager', 'employee'])
  public role: 'admin' | 'manager' | 'employee';
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public password?: string;

  @IsIn(['admin', 'manager', 'employee'])
  @IsOptional()
  public role?: 'admin' | 'manager' | 'employee';
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
