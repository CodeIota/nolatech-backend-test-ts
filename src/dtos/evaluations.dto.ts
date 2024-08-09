import { IsString, IsEnum, IsMongoId } from 'class-validator';
import { EvaluationStatus, EvaluationType } from '@interfaces/evaluations.interface';

export class CreateEvaluationDto {
  @IsMongoId()
  public employee: string;

  @IsString()
  public period: string;

  @IsEnum(EvaluationStatus)
  public status: EvaluationStatus;

  @IsEnum(EvaluationType)
  public type: EvaluationType;

  @IsMongoId()
  public evaluator: string;
}
