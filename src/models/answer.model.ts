import { model, Schema, Document } from 'mongoose';
import { Answer } from '@interfaces/answers.interface';

const answerSchema: Schema = new Schema({
  evaluation: {
    type: Schema.Types.ObjectId,
    ref: 'Evaluation',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const answerModel = model<Answer & Document>('Answer', answerSchema);

export default answerModel;
