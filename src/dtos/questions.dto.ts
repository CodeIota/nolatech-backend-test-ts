import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  public text: string;
}

export class UpdateQuestionDto {
  @IsString()
  public text?: string;
}
