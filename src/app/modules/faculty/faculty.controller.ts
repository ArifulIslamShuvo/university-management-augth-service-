import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/pagination';
import { Request, Response } from 'express';
import { AcademicFacultyService } from '../academicFaculty/academicFaculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculties retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
export const FacultyController = {
  getAllFaculties,
};
