import {body, validationResult} from 'express-validator'
import { BadRequestError } from '../../errors/custumErrors.js';
import Organizer from '../../models/OrganizerModel.js'

const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
};

export const validateSignupCredentials = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('Please fill the name field')
        .isLength({min:3, max:50})
        .withMessage('Name length must be in the range 3 and 50')
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('Please fill out the email field')
        .isEmail()
        .withMessage('Email format is not valid')
        .custom(async (email) => {
            const user = await Organizer.findOne({ email })
            if(user){
                throw new BadRequestError('email already exists')
            }
            return true
        }),
    body('contactemail')
        .notEmpty()
        .withMessage('Please fill the name field')
        .isEmail()
        .withMessage('Email format is not valid')
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('Please fill out the password field')
        .isLength({min:7, max:20})
        .withMessage('Password length should be in the range 7 to 20'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Please fill out the confirm password field')
        .custom((confirmPassword, { req }) => {
            console.log(req.body)
            if (confirmPassword !== req.body.password) {
                throw new BadRequestError('Confirm password does not match password');
            }
            return true
        }),
    body('website')
        .notEmpty()
        .withMessage('Please fill the website field')
        .trim(),
    body('about')
        .isLength({min:0, max:200})
        .withMessage('about length should be in the range 0 to 200')
        .trim(),
])

export const validateLoginCredentials = withValidationErrors([
    body('email')
        .isEmail()
        .withMessage('Enter correct email format')
        .notEmpty()
        .withMessage('Please fill out the email field'),
    body('password')
        .notEmpty()
        .withMessage('Please fill out the password field')
])