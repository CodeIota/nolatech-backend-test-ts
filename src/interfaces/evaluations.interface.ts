export enum EvaluationStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Completed = 'Completed',
}

export enum EvaluationType {
  Now = 'Now',
  Later = 'Later',
}

export interface Evaluation {
  _id: string;
  employee: string;
  period: string;
  score?: number;
  status: EvaluationStatus;
  type: EvaluationType;
  evaluator: string;
}
