import { IsString, IsMongoId } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  public name: string;

  @IsString()
  public position: string;

  @IsString()
  public department: string;

  @IsMongoId()
  public manager: string;
}

export class UpdateEmployeeDto {
  @IsString()
  public name?: string;

  @IsString()
  public position?: string;

  @IsString()
  public department?: string;

  @IsMongoId()
  public manager?: string;
}
