import { model, Schema, Document } from 'mongoose';
import { Evaluation, EvaluationStatus, EvaluationType } from '@interfaces/evaluations.interface';

const evaluationSchema: Schema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: EvaluationStatus,
    required: true,
  },
  type: {
    type: String,
    enum: EvaluationType,
    required: true,
  },
  evaluator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const evaluationModel = model<Evaluation & Document>('Evaluation', evaluationSchema);

export default evaluationModel;
