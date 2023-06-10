import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catAsync';

const createAcademecSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    res.status(200).json({
      success: true,
      massage: 'Academic Semester is created successfully!',
      data: result,
    });
  }
);

export const AcademicSemestercontroller = {
  createAcademecSemester,
};
