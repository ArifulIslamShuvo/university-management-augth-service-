import { IgenericErrorMassage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IgenericErrorMassage[];
};
