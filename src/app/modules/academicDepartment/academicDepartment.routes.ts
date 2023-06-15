import express from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validations';
import validateRequest from '../../middlewares/validateRequset';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

export const AcademicDepartmentRoutes = router;
