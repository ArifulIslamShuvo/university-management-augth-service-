import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pic';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterbleFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterbleFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllsemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);
const getSingleSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemesters(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully !',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemesters,
};
