import express from 'express'
import Joi from 'joi'
import { validate } from '../middleware/validation.mjs';
export const users = express.Router();
const schema = Joi.object({
    username: Joi.string().alphanum().min(5).required(),
    password: Joi.string().min(5).required(),
    roles: Joi.array().items(Joi.string().valid('ADMIN', 'USER')).required()
})
users.use(validate(schema))
users.post('/sign-up', (req, res) => {
    if(!req.validated) {
        res.status(500);
        throw ("This API requires validation")
    }
     if(req.joiError) {
        res.status(400);
        throw (req.joiError)
    }
   res.status(201).send(req.body);
});

