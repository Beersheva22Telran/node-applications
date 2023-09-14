import express from 'express'
import config from 'config'
import asyncHandler from 'express-async-handler'
import Joi from 'joi'
import { validate } from '../middleware/validation.mjs';
import UsersService from '../service/UsersService.mjs';
export const users = express.Router();
const usersService = new UsersService(process.env.ATLAS_URI_ACCOUNTS_TEST, config.get('mongodb.db'))
const schema = Joi.object({
    username: Joi.string().alphanum().min(5).required(),
    password: Joi.string().min(5).required(),
    roles: Joi.array().items(Joi.string().valid('ADMIN', 'USER')).required()
})
users.use(validate(schema))
users.post('/sign-up', asyncHandler(async (req, res) => {
    if(!req.validated) {
        res.status(500);
       throw ("This API requires validation")
    }
     if(req.joiError) {
        res.status(400);
        throw (req.joiError)
    }
  try {
    const accountRes = await usersService.addAccount(req.body);
     res.status(201).send(accountRes);
  } catch (error) {
    
    if (typeof(error) === 'string') {
        res.status(400);
    }
    throw (error);
  
}}));

