const catchAsync = fn => {
  return async (req: Request, res: Response, next: NewableFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
