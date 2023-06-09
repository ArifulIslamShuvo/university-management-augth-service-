import express from 'express';
// import { UserController } from './user.controller';
// import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequset';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemestercontroller } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemestercontroller.createAcademecSemester
);

export const AcademicSemesterRouts = router;
