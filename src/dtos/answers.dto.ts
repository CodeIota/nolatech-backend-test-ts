import { IsString, IsMongoId } from 'class-validator';

export class CreateAnswerDto {
  @IsMongoId()
  public evaluation: string;

  @IsMongoId()
  public question: string;

  @IsString()
  public response: string;
}

export class UpdateAnswerDto {
  @IsMongoId()
  public evaluation?: string;

  @IsMongoId()
  public question?: string;

  @IsString()
  public response?: string;
}
