import { Model } from 'mongoose';

export type IAcademicSemester = {
  title: string;
  year: number;
  code?: string;
  startMonth: string;
  endMonth?: string;
};

// Create a new Model type that knows about IUserMethods...
export type AcademicSemesterModel = Model<IAcademicSemester>;
