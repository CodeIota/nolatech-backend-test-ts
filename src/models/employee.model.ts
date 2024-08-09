import { model, Schema, Document } from 'mongoose';
import { Employee } from '@interfaces/employees.interface';

const employeeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const employeeModel = model<Employee & Document>('Employee', employeeSchema);

export default employeeModel;
