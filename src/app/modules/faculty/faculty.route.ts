import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { FacultyController } from './faculty.controller';
// import { FacultyValidation } from './faculty.validations';

import { AcademicFacultyController } from '../academicFaculty/academicFaculty.controller';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFaculties);

export const FacultyRoutes = router;
