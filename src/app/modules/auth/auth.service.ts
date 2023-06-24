import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
// const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
//   const { id, password } = payload;

//   //creating instance of User
//   const user = new User();

//   // access to our instsnce methods
//   const isUserExist = await user.isUserExist(id);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist');
//   }
//   if (
//     isUserExist.password &&
//     !user.isPasswordmatched(password, isUserExist?.password)
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   //create access token & refresh token

//   const { id: userId, role, needsPasswordChange } = user;
//   const accessToken = jwtHelpers.createToken(
//     { userId, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   const refreshToken = jwtHelpers.createToken(
//     { userId, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   );
//   console.log({ accessToken, refreshToken, needsPasswordChange });

//   return {
//     accessToken,
//     refreshToken,
//     needsPasswordChange,
//   };
// };

export const AuthService = {
  loginUser,
};
