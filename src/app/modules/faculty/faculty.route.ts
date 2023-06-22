import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
// import { FacultyValidation } from './faculty.validations';

const router = express.Router();
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
