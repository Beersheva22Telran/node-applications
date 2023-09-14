import Joi from 'joi'
export function validate(req, res, next) {
    if (req.schema && req.body) {
        const {error} = req.schema.validate(req.body);
        req.validated = true;
        req.error = error;
    }
    next();

}