import express from 'express';
import { UserRouts } from '../modules/user/user.route';
import { AcademicSemesterRouts } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouts,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouts,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users/', UserRouts);

export default router;
