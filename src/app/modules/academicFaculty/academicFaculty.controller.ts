import { Request, Response } from 'express';
import catchAsync from '../../../shared/catAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';
import httpStatus from 'http-status';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import pick from '../../../shared/pic';
import { paginationFields } from '../../../constants/pagination';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully!',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
};
