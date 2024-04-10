import type { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import httpStatus from 'http-status';

const { BAD_REQUEST } = httpStatus;

const productValidator = [
  check('model').trim().notEmpty().withMessage('Model is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Model can not be less than three characters long'),

  check('brand').trim().notEmpty().withMessage('Brand is required'),

  check('description').trim().notEmpty().withMessage('Description is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Description can not be less than three characters long')
    .bail()
    .isLength({ max: 250 })
    .withMessage('Description can not be more than 250 characters long'),

  check('price').trim().notEmpty().withMessage('Price is required')
    .bail()
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('Price must be a number between 0 and 1000000'),

  check('available').trim().notEmpty().withMessage('Available is required')
    .bail()
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('Available must be a number between 0 and 1000000'),

  // check('item_sold').trim()
  //   .bail()
  //   .isFloat({ min: 0, max: 1000000 })
  //   .withMessage('Item sold must be a number between 0 and 1000000'),

  check('shipping').trim().notEmpty().withMessage('Shipping is required')
    .bail()
    .isBoolean()
    .withMessage('Shipping must be a boolean'),

  // check('image').trim().notEmpty().withMessage('Image is required')
  //   .bail()
  //   .isURL()
  //   .withMessage('Image must be a valid URL')
  //   .bail()
  //   .isArray({ min: 1 })
  //   .withMessage('Image must be an array'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ errors: errors.array() });
    }
    return next();
  },

];

export {
  productValidator,
};

