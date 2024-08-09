import { model, Schema, Document } from 'mongoose';
import { Question } from '@interfaces/questions.interface';

const questionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  evaluation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Evaluation',
  },
});

const questionModel = model<Question & Document>('Question', questionSchema);

export default questionModel;
