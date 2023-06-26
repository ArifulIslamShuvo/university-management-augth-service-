import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interfaces';

// 2. Create a Schema corresponding to the document interface.
const AcademicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
