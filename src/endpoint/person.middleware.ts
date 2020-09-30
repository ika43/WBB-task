/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const querySchema = Joi.object({ name: Joi.string().required().trim() });

export const personMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const result = querySchema.validate(req.query);
    if(result.error) return res.status(400).send();
    next();
};